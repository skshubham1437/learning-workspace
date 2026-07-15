# Lesson 2 Completion: Bounded Contexts & DDD

The user completed Lesson 2 and passed the comprehension check. Key findings:

**Comprehension:**

- **Ubiquitous Language & Bounded Contexts:** The user correctly identified that when language diverges (e.g., "campaign" meaning different things in different modules), it signals a boundary for a Bounded Context.
- **Shared Kernel vs Anti-Corruption Layer:** The user initially confused `helper.js` (an accidental Shared Kernel) with an Anti-Corruption Layer. After correction, they demonstrated a clear understanding of the difference:
  - **Shared Kernel:** A single file or function shared across multiple places that creates tight coupling (changes break things everywhere).
  - **Anti-Corruption Layer (ACL):** A translation layer that prevents direct exposure of internal models, protecting one context from another's changes.
- **Bounded Context vs Microservice:** The user correctly identified that multiple Bounded Contexts can exist within a single deployment unit (Modular Monolith), showing they understand the distinction between conceptual boundaries and deployment boundaries.

## Evidence

Comprehension questions answered during Session 4 (2026-07-15). The user was able to self-correct and clearly define the difference between Shared Kernel and ACL in their own words.

## Next Steps

- The user still needs to complete the Lesson 2 exercise: "Draw your Context Map".
- Once the exercise is complete, proceed to Lesson 3 (Service Boundaries & Decomposition Strategies).
