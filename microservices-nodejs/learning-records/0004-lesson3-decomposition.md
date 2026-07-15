# Learning Record: Decomposition Strategies

**Date:** 2026-07-15
**Module:** 01 - Foundations
**Lesson:** 3 - Service Boundaries & Decomposition Strategies

## Concepts Mastered
- **Strangler Fig Pattern:** Successfully implemented a basic API Gateway in Node.js using `http-proxy-middleware` that routes specific paths to a new microservice while defaulting everything else to the monolith.
- **Branch by Abstraction:** Correctly identified this as the right pattern for extracting deep internal logic (like from a massive `helper.js`) that isn't cleanly exposed via REST APIs.
- **Parallel Run (Dark Launching):** Understood the failure domain — if the parallel microservice fails, the monolith must swallow the error, log it for debugging, and continue returning its own response to the user so they are unaffected.

## Code Artifacts
- **Exercise:** `playground/strangler-exercise/index.js`
  - Successfully configured a proxy router.
