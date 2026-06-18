# CI/CD Resources

## Knowledge

- [Docs: GitHub Actions — Official Documentation](https://docs.github.com/en/actions)
  The primary source of truth for workflow syntax, runners, contexts, expressions, and security. Use for: any question about how a specific Actions feature works.

- [Docs: Workflow Syntax Reference — GitHub](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions)
  Detailed YAML keyword reference (`name`, `on`, `jobs`, `runs-on`, `steps`, `strategy`, `env`, `permissions`). Use for: correct syntax when writing workflows.

- [Docs: Docker — Build with Docker (Multi-Stage Builds)](https://docs.docker.com/build/building/multi-stage/)
  Official guide to multi-stage Dockerfiles. Use for: understanding how to separate build and runtime environments to produce small, secure images.

- [Docs: Dockerfile Reference — Docker](https://docs.docker.com/reference/dockerfile/)
  Complete reference for every Dockerfile instruction (`FROM`, `COPY`, `RUN`, `CMD`, `ENTRYPOINT`, `ARG`, `ENV`, etc.). Use for: looking up exact instruction syntax and behaviour.

- [Docs: Docker Best Practices — Docker](https://docs.docker.com/build/building/best-practices/)
  Official best practices for writing Dockerfiles: layer ordering, caching, `.dockerignore`, minimising layers. Use for: making Dockerfiles production-quality.

- [Repo: actions/starter-workflows — GitHub](https://github.com/actions/starter-workflows)
  Official starter workflow templates for Node.js, Go, and many other languages. Use for: seeing real, blessed examples of CI workflows.

- [Docs: Security Hardening for GitHub Actions — GitHub](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
  Guidance on secrets management, pinning actions to SHAs, OIDC, and least-privilege tokens. Use for: understanding security implications (even though deep security is out of scope for now, awareness matters).

- [Action: docker/build-push-action — GitHub](https://github.com/docker/build-push-action)
  The standard action for building and pushing Docker images from GitHub Actions. Use for: learning how to wire Docker builds into CI pipelines.

## Wisdom (Communities)

- [r/devops](https://reddit.com/r/devops)
  Active subreddit for CI/CD, containerisation, and infrastructure discussion. Signal-to-noise is decent with moderation. Use for: real-world war stories, tooling debates, "what do you use" threads.

- [GitHub Community Discussions — Actions](https://github.com/orgs/community/discussions/categories/actions)
  Official discussion forum for GitHub Actions. Use for: debugging weird runner behaviour, discovering undocumented features, and seeing how others solve pipeline problems.

## Gaps

- No single authoritative "CI/CD from scratch" textbook exists. The best path is official docs + hands-on practice, which is what we're doing.
- Deployment target documentation (e.g., deploying to a VPS, or a cloud provider) — intentionally deferred per the mission.
