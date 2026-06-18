# CI vs CD distinction and the pipeline mental model are understood

The user correctly distinguished CI (validation: lint, test, build) from CD (delivery: package, push, deploy), identified Docker and GitHub Actions as complementary layers (packaging vs orchestration), and recognised that the pipeline *shape* is stack-agnostic — only the commands inside each stage change across React, Node, and Go.

## Evidence
- Answered all three retrieval questions correctly after completing Lesson 01, without referring back to the material.

## Implications
- Safe to move to Docker-specific content without re-explaining why CI/CD exists.
- Can reference "the pipeline" as a known concept in future lessons.
- The user grasps the three-layer model (code → Docker → Actions) well enough to start learning each layer in depth.
