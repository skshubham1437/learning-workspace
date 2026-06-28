# Matrix builds and dependency caching understood

The user completed Lesson 05, which covered `strategy.matrix` for running parallel jobs across different configurations, and dependency caching using `actions/setup-node`'s built-in `cache: 'npm'` option. The user now understands: (1) how a matrix creates parallel job instances, (2) the `fail-fast` configuration, (3) that `npm ci` caches the download cache `~/.npm` and not `node_modules/`, and (4) how cache hits and misses are determined via the hash of the lockfile.

## Evidence

- Completed the lesson and confirmed progress.

## Implications

- The user has a solid grasp of complex workflow structures and optimizations.
- The user is ready for Lesson 06 on secrets, environment variables, and permissions, introducing the `env` and `secrets` context objects.
