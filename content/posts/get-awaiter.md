---
author: "Mayuresh Waykole"
title: 'Thread Exhaustion Due to GetAwaiter().GetResult() in C#'
tags: [c#, 'Task Parallel Library', 'Thread Exhaustion', Concurrency]
categories: [engineering]
description: "Deep dive into thread pool exhaustion caused by GetAwaiter().GetResult() in C#. Learn why blocking on async code leads to deadlocks and how to fix it."
date: 2025-03-20T22:12:03.284Z
draft: false
ShowToc: true
TocOpen: true
---

# Thread Exhaustion Due to GetAwaiter().GetResult() in C#

Recently we've seen an abundance of Async only API's in c# and common libraries like httpclient.
In most cases, this encorages best practice async/await development especially on the server side, however not all is good.
In some unique situations, we need to call these async method in a synchronous manner.

The most common way to do this is using `GetAwaiter.GetResult()`

```c
Task<string> pingTask = new HttpClient().GetStringAsync("https://google.com");
var webpage = pingTask.GetAwaiter().GetResult();
```

The `GetAwaiter().GetResult()` call blocks the calling thread and this can cause thread starvation.

Consider an example where you want to get a couple of webpages parallelly.
For ease of understanding we just get google.com
Your function looks like this

```c#
/// <summary>
/// Synchronously pings the URL and returns the result.
/// </summary>
/// <returns>Webpage content</returns>
private static string PingUrlSync()
{
    // Call the asynchronous method and wait for the result
    Task<string> pingTask = new HttpClient().GetStringAsync("https://google.com");
    var webpage = pingTask.GetAwaiter().GetResult();
    return webpage;
}
```

No harm done, looks fine. If we run this once, we're sure to get the webpage string.
If we want to run this a couple of times parallelly, we'd do something like this

```c#
// A randomly high number of iterations
var taskCount = 100;

// Start multiple tasks to ping the URL
for (int i = 0; i < taskCount; i++)
{
    tasks.Add(Task.Run(() => { PingUrlSync(); }));
}
```

This is where the problem starts.
If we add a bit of logging, and constrain the dotnet threadpool with no. of threads equal to no. of processors, this code will hang.

```log
processor count: 8
Max worker threads set to 17
Max completion port threads set to 8
PingUrlSync	, Iteration: 0, ThreadId: 4
PingUrlSync	, Iteration: 1, ThreadId: 3
PingUrlSync	, Iteration: 3, ThreadId: 8
PingUrlSync	, Iteration: 2, ThreadId: 7
PingUrlSync	, Iteration: 4, ThreadId: 9
PingUrlSync	, Iteration: 5, ThreadId: 10
PingUrlSync	, Iteration: 6, ThreadId: 11
PingUrlSync	, Iteration: 7, ThreadId: 12
```

In this post we'll understand why this code hangs and how can we investigate such issues in visual studio.

## Task Parallell Library
We need a little bit of background about the Task Parallell library to understand whats going on.

Task Parallel Library (TPL) is a set of public types and APIs in .NET that simplify the process of adding parallelism and concurrency to applications. It was introduced in .NET Framework 4.0 and is the recommended way to write multithreaded and parallel code.

TPL handles the partitioning of work, scheduling of threads on the ThreadPool, cancellation support, state management, and other low-level details. It scales the degree of concurrency dynamically to most efficiently use all available processors.

When running async/await or threaded tasks, all these tasks get pushed to a queue and are scheduled on the thread pool. 

### async await
Essentially, async/await code is internally a set of tasks.

When you call an async method, it creates a new task for the IO work and schedules this task on one of the many threads in the I/O pool which have I/O connection ports. The return value is a task with a return type.

`Task<string> pingTask = new HttpClient().GetStringAsync("https://google.com");`

when you call await on this task, the runtime frees up the calling thread, and will schedule the rest of your code as a continuation. This continuation is scheduled only after the awaited task is complete.

## Thread Starvation

Now that we have background on the problem and some basics about Task Parallell library, we can dig deeper.

When we create the PingUrlSync task, it gets added to the queue and is waiting to be scheduled.
When calling GetAwaiter().GetResult(), we are asking the runtime to wait in this current/calling thread for the task to complete. 
Essentially, for every pingurlsync call, we now have atleast 1 new task and 1 blocked thread. 
When we call this method multiple times concurrently, we have multiple blocked threads.

The CLR threadpool is not an unlimited resource. At some point, if you run sufficient no. of concurrent tasks, you'll end up blocking all the threads and tasks that are in the Queue waiting to be scheduled will not have any threads to run on. 

At this point the blocked threads are waiting for tasks to complete and tasks in queue are waiting for a thread to free up so they can do their work. We now have a deadlock and it results in a hanged state.

```mermaid
graph TD
    subgraph "Task Queue"
        T1[Task 1]
        T2[Task 2]
        T3[Task 3]
        T4[Task 4]
        T5[Task 5]
    end
    
    subgraph "Thread Pool (3 threads)"
        TP1[Thread 1] --> |"Blocked waiting for Task 1"| B1[Blocked]
        TP2[Thread 2] --> |"Blocked waiting for Task 2"| B2[Blocked]
        TP3[Thread 3] --> |"Blocked waiting for Task 3"| B3[Blocked]
    end
    
    T1 --> TP1
    T2 --> TP2
    T3 --> TP3
    
    style T1 fill:#f9f,stroke:#333,stroke-width:2px
    style T2 fill:#f9f,stroke:#333,stroke-width:2px
    style T3 fill:#f9f,stroke:#333,stroke-width:2px
    style T4 fill:#f9f,stroke:#333,stroke-width:2px
    style T5 fill:#f9f,stroke:#333,stroke-width:2px
    style TP1 fill:#bbf,stroke:#333,stroke-width:2px
    style TP2 fill:#bbf,stroke:#333,stroke-width:2px
    style TP3 fill:#bbf,stroke:#333,stroke-width:2px
    style B1 fill:#f66,stroke:#333,stroke-width:2px
    style B2 fill:#f66,stroke:#333,stroke-width:2px
    style B3 fill:#f66,stroke:#333,stroke-width:2px
```
