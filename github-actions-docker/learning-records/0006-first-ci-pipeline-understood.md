# First CI pipeline structure understood; `needs:` vs `uses:` confusion resolved

The user completed Lesson 04, which built on the earlier `uses:` / `needs:` confusion (LR-0005). The lesson explicitly corrected the misconception with a comparison table and mnemonic, then walked through a complete two-job CI workflow (lint → test) with `needs: lint` on the test job. The user now understands: (1) `needs:` is job-level and controls ordering, (2) `uses:` is step-level and loads Actions, (3) each job gets an isolated runner — `needs:` does not share state, (4) `npm ci` is preferred over `npm install` in CI for deterministic installs, and (5) dual triggers (`push` + `pull_request`) form a pre-merge gate plus post-merge safety net.

## Evidence
- Completed the lesson and its retrieval practice questions (spot-the-bug exercise reinforced the `uses:`/`needs:` distinction and job isolation).

## Implications
- The user is ready for `strategy.matrix` — they understand single-job workflows and can now extend to running the same job across multiple configurations.
- Dependency caching (`actions/cache` / built-in `cache:` on `actions/setup-node`) is a natural next step since they've seen `npm ci` run from scratch on every job.
- The concept of job isolation is well-established — this will matter again when we discuss artifacts for sharing files between jobs.
