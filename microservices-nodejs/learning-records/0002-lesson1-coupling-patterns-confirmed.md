# Lesson 1 Completion: Monolith Coupling Patterns Confirmed

The user completed Lesson 1 and the Lesson 1 exercise (mapping monolith coupling surface). Key findings from the exercise debrief:

**Functional areas identified:** The user identified areas in their monolith but noted they overlap heavily — hard to draw clean lines between them. This is exactly the problem Bounded Contexts (Lesson 2) are designed to solve.

**Coupling patterns observed (all present):**
- Multiple modules read/write from the same database tables (shared data coupling)
- One module directly calls functions from another module's service layer (direct function coupling)
- Shared utility/helper functions that multiple modules depend on (e.g., helper.js at 3,600+ lines)
- Changes in one module frequently break or require changes in another module

**Most tangled module:** The core domain module (Influencers/Campaigns) — described as the heart of the business. This aligns with DDD's "Core Domain" concept: the most important, most complex, and most coupled part of the system.

## Evidence

Diagnostic questions answered during Session 3 (2026-06-29). Confirmed by inspection of the actual codebase structure at `/cb-projects/Xley-Backend/service/v1/` — 30 service modules, a 462KB `influencer_main.js`, and a 3,600+ line shared `helper.js`.

## Implications

- Lesson 2 (Bounded Contexts & DDD) is calibrated to address the overlapping-boundaries problem directly
- The helper.js coupling pattern is highlighted as an "accidental Shared Kernel" in Lesson 2
- The user's Core Domain (Campaign + Influencer) will be the central example throughout Module 01-02
- Module 02 (Service Design) should include a concrete exercise: decomposing one of the user's actual modules using DDD heuristics
- The "30 modules → ~6 Bounded Contexts" mapping in Lesson 2 is grounded in the user's actual codebase structure
