# Teaching Notes

## User Preferences
- Wants conceptual depth, not just copy-paste recipes
- Has some apps, not all — build what's missing along the way
- Has seen Docker/Actions but never set up themselves

## Curriculum Plan (Rough)

### Phase 1: The Big Picture
1. ✅ Lesson 01: What CI/CD actually is — the mental model
2. ✅ Lesson 02: What Docker actually is — containers vs VMs, images vs containers, anatomy, caching

### Phase 2: GitHub Actions Deep Dive
3. ✅ Lesson 03: Anatomy of a workflow file — triggers, jobs, steps, runners
4. ✅ Lesson 04: Your first CI pipeline — lint + test a Node.js app
5. Lesson 05: Matrix builds and caching — testing across versions
6. Lesson 06: Secrets, environment variables, and permissions

### Phase 3: Docker + Actions for Each Stack
7. Lesson 07: Dockerizing a React app — multi-stage build (build → nginx)
8. Lesson 08: Dockerizing a Node/Express app — dev vs prod images
9. Lesson 09: Dockerizing a Go backend — from 1GB to 15MB images
10. Lesson 10: CI pipeline — build Docker image + push to registry
11. Lesson 11: Full CD pipeline — build, push, deploy (conceptual)

### Phase 4: Putting It Together
12. Lesson 12: Monorepo vs polyrepo — path filters, reusable workflows
13. Lesson 13: The real-world pipeline — review the whole picture

## Known Misconceptions (Corrected)
- Confused `uses:` (step-level: load an Action) with `needs:` (job-level: declare a dependency). Corrected in Lesson 04.
