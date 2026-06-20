# Workflow hierarchy understood; `uses` vs `needs` confusion identified

The user correctly explained why `actions/checkout` is required (the runner is a fresh VM with no code), demonstrating solid understanding of runner ephemerality. When asked how to make one job wait for another, the user correctly identified the *concept* (job B should depend on job A) but used the wrong keyword — `uses: lint` instead of `needs: lint`. This conflates step-level action loading (`uses:`) with job-level dependency declaration (`needs:`).

## Evidence
- Q2 (checkout): Correct — "our code is not present in that container or vm or actions."
- Q1 (job deps): Conceptually right, syntactically wrong — said `uses: lint` instead of `needs: lint`.
- Q3 (workflow vs pipeline): Not known — "not mentioned in the lesson."

## Implications
- Lesson 4 should open by correcting the `uses`/`needs` confusion explicitly — the user is primed for it.
- The workflow-vs-pipeline distinction (abstract concept vs YAML implementation) needs a light touch in the next lesson, not a full re-teach.
- The user is ready for hands-on work: writing a real workflow file will cement the hierarchy and fix the keyword confusion through practice.
