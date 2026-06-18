# Microservices & Distributed Systems Resources

## Knowledge

- [Book: _Building Microservices: Designing Fine-Grained Systems_ (2nd Ed.) — Sam Newman](https://samnewman.io/books/building_microservices_2nd_edition/)
  The definitive handbook for microservice decomposition, service boundaries, Conway's Law, and operational patterns. Use for: Modules 01-02, and as a recurring reference for all design decisions.

- [Book: _Designing Data-Intensive Applications_ — Martin Kleppmann](https://dataintensive.net/)
  Essential for understanding distributed data consistency, replication, partitioning, and stream processing at a theoretical level. Use for: Modules 04-05, 12, 15.

- [Book: _Microservices Patterns_ — Chris Richardson](https://microservices.io/book)
  44 reusable patterns (Saga, API Gateway, Circuit Breaker, CQRS, Event Sourcing). Deeply technical. Use for: Modules 03-07, 13.

- [Book: _Release It!_ (2nd Ed.) — Michael T. Nygard](https://pragprog.com/titles/mnee2/release-it-second-edition/)
  How to build resilient systems that survive production. Stability patterns, anti-patterns, and war stories. Use for: Module 07 (Reliability Patterns).

- [Book: _Monolith to Microservices_ — Sam Newman](https://samnewman.io/books/monolith-to-microservices/)
  Pragmatic strategies for migrating legacy monoliths. Strangler Fig, Branch by Abstraction. Use for: Modules 13-14.

- [Website: Microservices.io — Chris Richardson](https://microservices.io/)
  Comprehensive pattern catalog for microservices. Each pattern has problem/solution/tradeoffs structure. Use for: quick reference on any specific pattern.

- [Website: Martin Fowler's Microservices Guide](https://martinfowler.com/microservices/)
  High-level definitions, core characteristics, and the "Microservice Premium" concept. Use for: Module 01 foundational principles.

- [GitHub: Node.js Best Practices — Yoni Goldberg](https://github.com/goldbergyoni/nodebestpractices)
  Production-ready Node.js patterns. Use for: ensuring all code examples follow established best practices.

- [Article: "Microservice Premium" — Martin Fowler](https://martinfowler.com/bliki/MicroservicePremium.html)
  When microservices are NOT the right choice. Use for: Module 01 tradeoffs discussion.

- [Article: "MonolithFirst" — Martin Fowler](https://martinfowler.com/bliki/MonolithFirst.html)
  Why starting with a monolith is often the right approach. Use for: Module 01.

## Wisdom (Communities)

- [r/microservices](https://reddit.com/r/microservices)
  Active subreddit discussing real-world microservice challenges. Useful for: architecture review, pattern debates.

- [r/node](https://reddit.com/r/node)
  Node.js community. Useful for: Node-specific implementation questions and production war stories.

- [The Distributed Systems Reading Group](https://dsrg.pdos.csail.mit.edu/)
  Academic-leaning reading group for distributed systems papers. Useful for: deep theoretical understanding in Module 15.

## Gaps

- No high-quality, Node.js-specific guide to Kubernetes deployment patterns (most are Go/Java-focused)
- Need to find production case studies from companies that migrated Node.js monoliths specifically
