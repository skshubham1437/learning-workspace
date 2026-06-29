# Teaching Notes

## User Profile (Calibrated 2026-06-18)

- Production Node.js backend engineer
- **Strong in:** Event loop, Express.js, REST APIs, auth (JWT/OAuth2), MySQL (including isolation levels/locking)
- **Moderate in:** Docker (single-container), Node.js streams (basic r/w), MongoDB (CRUD-level)
- **Basic in:** Redis (key-value caching only), observability (console.log + winston + PM2), Docker Compose (single-container)
- **Can whiteboard:** CAP theorem (basic), eventual consistency (basic), idempotency (correct model)
- **Has heard of but cannot explain:** Circuit breaker, Saga, Event sourcing, CQRS
- **Never built:** real-world microservices, distributed architectures, Kafka/RabbitMQ/gRPC/Istio/K8s
- **Key motivator:** Has a large Express monolith with clear module separation, has already thought about splitting it but doesn't know where to draw service boundaries

## Teaching Preferences

- Bridge ALL new concepts to existing monolith/Node.js experience — never start from scratch
- Production-quality code only — no tutorial-quality hello-world examples
- Always show failure paths, not just happy paths
- Structured tradeoff tables, not paragraph comparisons
- Mermaid diagrams for all architecture visuals
- Exercises must build real things, not fill-in-the-blank

## Hard Rules

- NEVER re-explain: JWT, Docker basics (Dockerfile/image concepts), Express middleware
- CAN reference but MUST add depth: Redis, MongoDB, Docker Compose, Node.js streams
- Every concept must anchor to something from the monolith background
- Do not proceed past an exercise without the user attempting it
- Check in every 2-3 topics with comprehension questions

## Prerequisite Gaps to Fill During Course

- Node.js streams backpressure → needed before Kafka (Module 03)
- Redis pub/sub and data structures → needed before distributed caching (Module 12)
- Docker Compose multi-service → needed before Kubernetes (Module 10)
- Structured logging → needed before observability stack (Module 08)

## Progress Tracking

- Current Module: 01 — Foundations (Lesson 2 delivered)
- Exercises Pending: "Draw your Context Map" (Lesson 2 exercise)
- Exercises Completed: "Map your monolith's coupling surface" (Lesson 1 — debriefed Session 3)
- Confidence Ratings: (none yet)

## Session Log

- Session 1 (2026-06-18): Course setup, workspace initialized, diagnostic assessment completed. User's actual knowledge depth calibrated — significantly different from initial prompt claims. Ready to begin Module 01.
- Session 2 (2026-06-27): Workspace structural overhaul. Created `./assets/lesson.css` (shared stylesheet), `./reference/glossary.html`, flat `./lessons/` directory. Regenerated Lesson 1 with citations, primary source, glossary cross-links, and "ask teacher" reminder. Removed nested phase/module/lessons directory structure.
- Session 3 (2026-06-29): Lesson 1 exercise debrief. User confirmed all coupling patterns present (shared DB, direct function calls, shared helpers, cross-module breakage). Core domain (Influencers/Campaigns) identified as most tangled. Inspected actual monolith (`Xley-Backend`) — 30 service modules under `service/v1/`, 462KB `influencer_main.js`, 3,600+ line `helper.js`. Created Lesson 2 (Bounded Contexts & DDD) grounded in user's actual codebase. Updated glossary with 8 new DDD terms. Created learning record 0002.
