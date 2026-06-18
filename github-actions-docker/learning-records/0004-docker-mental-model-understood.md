# Docker mental model and caching are understood

The user correctly distinguished Docker images (read-only blueprints) from containers (running instances), identified why layer caching dictates the order of instructions in a Dockerfile (copying `package.json` before source code), and explained why containers start much faster than VMs (sharing the host's kernel).

## Evidence
- Answered all three retrieval questions correctly after completing Lesson 02, without referring back to the material.

## Implications
- The user understands the difference between an Image and a Container, which is the most common stumbling block for beginners.
- We can now safely use terms like "layer caching" and "image vs container" in future stack-specific lessons without re-explaining them.
- Phase 1 (The Big Picture) is effectively complete. We can move on to Phase 2 (GitHub Actions Deep Dive).
