# CI/CD Glossary

Canonical terminology for CI/CD, Docker, and GitHub Actions. Terms are added here only after the learner has demonstrated understanding.

## Core Concepts

**CI (Continuous Integration)**:
The automated process of validating every code change — linting, testing, and building — to catch problems before they reach production.
_Avoid_: "automated testing" (CI is broader), "build server" (that's the runner, not the process)

**CD (Continuous Delivery / Continuous Deployment)**:
The automated process of getting validated code to users. *Delivery* means it's ready to deploy (human presses the button). *Deployment* means it goes out automatically.
_Avoid_: Using CD without specifying which variant you mean

**Pipeline**:
The full sequence of automated stages code passes through — from checkout to deployment. The shape is stack-agnostic; only the commands inside each stage change.
_Avoid_: "build process" (a pipeline is more than just building)

**Workflow**:
A YAML file in `.github/workflows/` that defines a pipeline for GitHub Actions. One repository can have many workflows.
_Avoid_: Confusing with "pipeline" — a workflow is the GitHub Actions implementation of a pipeline

**Runner**:
The virtual machine (provided by GitHub or self-hosted) where a workflow job executes.
_Avoid_: "server" (runners are ephemeral, not persistent servers)

## Docker Concepts

**Image**:
The read-only blueprint that contains the OS, runtime, code, and dependencies needed to run an application.
_Avoid_: "container" (images are not running)

**Container**:
A running instance of an image. It shares the host machine's kernel but has isolated processes, networking, and file system.
_Avoid_: "VM" or "Virtual Machine" (containers do not have their own kernel)

**Dockerfile**:
A text document containing all the instructions (`FROM`, `COPY`, `RUN`, etc.) needed to assemble a Docker image.

**Layer**:
A set of file system changes created by a single instruction in a Dockerfile. Docker caches these layers to drastically speed up future builds.

## GitHub Actions Concepts

**Action**:
A reusable, pre-packaged unit of automation that a step invokes via `uses:`. Published by the community or by GitHub (e.g., `actions/checkout@v4`).
_Avoid_: Confusing with "step" — an Action is what a step *runs*; the step is the container for it

**Step**:
A single task within a job, executed sequentially. Either runs a pre-built Action (`uses:`) or a shell command (`run:`).
_Avoid_: Confusing with "job" — steps within a job share the same runner; jobs do not

**Trigger (Event)**:
The condition declared under `on:` that causes a workflow to run. Examples: `push`, `pull_request`, `schedule`, `workflow_dispatch`.

**Matrix (Strategy Matrix)**:
A job-level configuration under `strategy: matrix:` that runs the same job once per value (or combination of values) in a list. Each matrix instance is an independent job on its own runner.
_Avoid_: "loop" — it's parallel by default, not sequential

**Expression**:
The `${{ }}` syntax used to access contexts (like `matrix`, `github`, `env`, `secrets`) at runtime. GitHub Actions evaluates these before running the step.

**Cache Key**:
A string that uniquely identifies a cached directory. Typically built from the runner OS and a hash of a lockfile (e.g., `package-lock.json`). When the key matches, the cache is restored; when it doesn't, a fresh download occurs.

**fail-fast**:
A `strategy:` option (default: `true`) that cancels all other matrix jobs when one fails. Set to `false` to let all matrix jobs run to completion.
