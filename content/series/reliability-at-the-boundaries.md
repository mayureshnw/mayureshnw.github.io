---
title: Reliability at the Boundaries
description: A curated reading path on async execution, event-driven communication, and the design choices that keep distributed systems predictable under failure.
date: 2026-04-11T00:00:00.000Z
lastmod: 2026-04-11T00:00:00.000Z
draft: false
weight: 10
hideMeta: true
focusAreas:
  - Event-driven communication and the contracts hidden inside asynchronous work
  - Blocking versus non-blocking execution paths under load
  - Retries, idempotency, and the signals teams need to debug real failures
upNext:
  - Idempotency patterns for retry-safe APIs, jobs, and workers
  - Operational feedback loops for async systems with OpenTelemetry metrics
installments:
  - /posts/events
  - /posts/get-awaiter
---

This series brings together the essays on this site that share one practical question: **what keeps a system understandable once work crosses a boundary?** Threads, queues, retries, and production incidents all punish vague design. The goal here is to collect the pieces that make those boundaries easier to reason about before they become outages.

Use this page as a guided entry point if you are designing services, debugging concurrency problems, or trying to make operational behavior less surprising. Each installment stands on its own, but the sequence is meant to move from communication primitives to the failure modes that show up under real load.
