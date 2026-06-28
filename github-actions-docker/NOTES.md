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

1. ✅ Lesson 03: Anatomy of a workflow file — triggers, jobs, steps, runners
2. ✅ Lesson 04: Your first CI pipeline — lint + test a Node.js app
3. ✅ Lesson 05: Matrix builds and caching — testing across versions
4. ✅ Lesson 06: Secrets, environment variables, and permissions

### Phase 3: Docker Fundamentals (Prep for Kubernetes)

1. ✅ Lesson 07: Essential Docker CLI — run, ps, logs, exec
2. ✅ Lesson 08: Writing your first Dockerfile — FROM, RUN, COPY, CMD
3. ✅ Lesson 09: Docker Volumes & Persistent Data
4. Lesson 10: Docker Networks & Container Communication
5. Lesson 11: Multi-container apps with Docker Compose
6. Lesson 12: Optimizing Images & Healthchecks for Orchestrators

### Phase 4: Docker + Actions for Each Stack

1. Lesson 13: Dockerizing a React app — multi-stage build (build → nginx)
2. Lesson 14: Dockerizing a Node/Express app — dev vs prod images
3. Lesson 15: Dockerizing a Go backend — from 1GB to 15MB images
4. Lesson 16: CI pipeline — build Docker image + push to registry
5. Lesson 17: Full CD pipeline — build, push, deploy (conceptual)

### Phase 5: Putting It Together

1. Lesson 18: Monorepo vs polyrepo — path filters, reusable workflows
2. Lesson 19: The real-world pipeline — review the whole picture

## Known Misconceptions (Corrected)

- Confused `uses:` (step-level: load an Action) with `needs:` (job-level: declare a dependency). Corrected in Lesson 04.
