---
title: Events
date: 2019-05-01T22:12:03.284Z
tags: [events, python]
---

In this post, we will explore what events are, how they are used and the advantages. Throughout the post we will build our way up to a complete event driven program.
We will use python do this, since python has no inherent way to handle events we need to build everything from scratch.

### Events
`Events` in the simplest terms are notifications.
Software written such that it largely relies on events for communication is said to be `Event Driven`

The most common operations to do with an event are

* Listen
* Emit

A program that would like to take some action when an event has occured, `listens` for that event.

A program `Emits` an Event when it would like to notify that some change has occured.


Lets start with a bare bones structure with nothing but the method definition
```python
# Events.py

def emit(event):
    # doSomething

def listen(event):
    # doSomething
```


Below is the test code. This will be used to run the Events that we write and test it.
```python
# events.test.py

import Events as E

# Does nothing yet.
# Expectation: to be triggered when the event occurs.
E.listen('FIRST_EVENT')

# Does nothing yet.
# Expectation: to trigger the listener.
E.emit('FIRST_EVENT')
```

Now that we have the general structure of the code, lets define the behaviour.

Events are supposed to facilitate real time communication.
> `The execution flow is defined by the events`

What this means is that any listener listening on `FIRST_EVENT` will be triggered when that event is emitted. To do this, our listeners have to first let us know what they are listening on. Usually, the listener wants to run some code when an event occurs. This code can be put in a function, referred to as a `callback`

Updating our test to reflect the callback
```python
# events.test.py

import Events as E

# callback function
def printData():
    print("an event occured")

# when event occurs, call printData
E.listen('FIRST_EVENT', printData)

# send event
E.emit('FIRST_EVENT')
# > an event occured

# sends event
E.emit('SECOND_EVENT')
# > 
```

The test code when run with the events library should print "an event occured" when the FIRST_EVENT is sent. However when the SECOND_EVENT is sent, nothing should happen since there is no one listening to the second event.

Lets look at the `events.py` implementation to see if we can make it behave as expected in the test.

The first thing we need is to map events to listeners.
`An event can have multiple listeners.`

So a good data structure to use will be a HashMap/Dictionary in python.
The key will be the event and value will be a list of callback functions.
It should look something like this
```python
{
    'EVENT1_NAME': [<listener1 callback>, <listener2 callback>]
}
```

Here we do the core implementation of listening to an event.
The code comments provide a detailed explanation of whats happening
```python
# Events.py

# dictionary. key = Event, value = list of callbacks
EventListenerMap = {}

'''
The callback is added to list for an event
'''
def listen(event, callback):

    # if its a new event, initialize a list
    if event not in EventListenerMap:
        EventListenerMap[event] = []

    # add callback function to list of listeners for that event
    EventListenerMap[event].append(callback)


'''
Runs all the callback functions for that event
'''
def emit(event):
    # get list of callback for event
    listeners = EventListenerMap.get(event)
    
    # If theres atleast one listener
    if listeners != None:

        # iterate over list and call the function 
        # passed by the listener
        for callback in listeners:
            callback()
    
```

This gives the basic implementation of our event library.


Live code can be seen here https://repl.it/@MayureshWaykole/events-Basics