# Prior Knowledge: Production Node.js Monolith Engineering

The user enters this learning track as a production Node.js backend engineer who has built and maintained a large Express.js monolith with clear module separation (routes, controllers, services, models). Their knowledge is real but has specific depth boundaries that were clarified through diagnostic assessment.

**Established knowledge floor (do not re-teach):**

- Node.js event loop (understands the concept; libuv/streams/workers are NOT deep knowledge)
- Express.js (middleware chains, routing, error handling) — strong
- REST API design (versioning, pagination, status codes) — strong
- Authentication & authorization (JWT, OAuth2, sessions, RBAC) — strong
- MySQL (joins, indexes, transactions, stored procedures, isolation levels, InnoDB locking) — strong
- Docker (Dockerfiles, single-container setups) — moderate

**Partial knowledge (can bridge from, but needs depth):**

- Node.js streams: has used readable/writable but doesn't understand backpressure or transform streams. WILL NEED THIS for Kafka/message streaming in Module 03.
- Redis: basic key-value caching via Docker Compose only. NOT experienced with pub/sub, data structures, or advanced patterns. CANNOT assume Redis knowledge for distributed caching (Module 12).
- MongoDB: CRUD usage. NOT deep on aggregation pipelines or schema design tradeoffs. Can reference as "a database you've used" but not as expert-level knowledge.
- Docker Compose: single-container setups only. Multi-service orchestration is new. WILL NEED scaffolding before Module 10.
- Observability: console.log + basic winston + PM2. Structured logging, metrics, tracing are all new. Module 08 starts from scratch.
- API Gateway: understands it as "reverse proxy in front of app" — correct intuition but needs formal treatment in Module 06.

**Concepts the user CAN discuss at whiteboard level:**

- CAP theorem (basic: pick 2 of 3)
- Eventual consistency (basic: data syncs eventually)
- Idempotency (correct mental model: unique keys prevent duplicates)

**Concepts the user has heard of but CANNOT explain tradeoffs:**

- Circuit breaker, Saga pattern, Event sourcing, CQRS — heard of, cannot draw or explain

**Key insight for teaching:**
The user has already thought about splitting their monolith into services but doesn't know where to draw lines. This is the perfect entry point for Module 01 — they have the motivation and the codebase mental model, just not the framework for making the decisions.

## Evidence

Diagnostic assessment conducted in Session 1 (2026-06-18). User self-reported through structured multiple-choice calibration questions.

## Implications

- Module 03 (Communication): will need to teach Node.js streams/backpressure as a prerequisite before Kafka
- Module 08 (Observability): start from structured logging basics, not assume existing setup
- Module 12 (Scaling): Redis distributed caching must be taught, not assumed
- Modules 10-11 (Deployment): Docker Compose multi-service needs explicit coverage before Kubernetes
- Module 01 (Foundations): can use their "where do I draw the lines?" question as the central hook
