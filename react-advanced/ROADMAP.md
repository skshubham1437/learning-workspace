# React Learning Roadmap

This roadmap is the teaching plan for the React track. Each lesson should teach one concept, show a tiny example, connect it to real React code, and end with retrieval practice. The goal is not speed; the goal is durable understanding.

## Lesson Rhythm

1. Concept: define the idea in plain language.
2. Mental model: explain how to think about it while reading code.
3. Tiny example: inspect a small focused snippet.
4. Real code: map the concept onto `xley-frontend` when the path is available.
5. Retrieval: answer a small question or classify a short snippet.

## Phase 1: React Reading Fundamentals

- Lesson 01: Read a React feature from the outside in
  Concept focus: component tree, props, state ownership, derived data.
- Lesson 02: JSX is JavaScript plus UI description
  Concept focus: expressions, attributes, children, conditional rendering.
- Lesson 03: Components are pure render functions
  Concept focus: render, purity, inputs, outputs, avoiding hidden mutation.
- Lesson 04: Props are arguments
  Concept focus: parent-to-child data flow, component APIs, prop drilling.
- Lesson 05: State is component memory
  Concept focus: `useState`, updates, rerendering, event handlers.
- Lesson 06: State is a snapshot
  Concept focus: stale reads, queued updates, functional state updates.
- Lesson 07: Derived data is not state
  Concept focus: filtering, sorting, formatting, avoiding duplicate state.
- Lesson 08: Lists and keys
  Concept focus: identity, preserving state, resetting state intentionally.

## Phase 2: Interactivity And State Design

- Lesson 09: Controlled inputs
  Concept focus: form values, change handlers, validation state.
- Lesson 10: Lifting state up
  Concept focus: shared state and closest common owner.
- Lesson 11: Reducers
  Concept focus: events, actions, transitions, complex local state.
- Lesson 12: Context
  Concept focus: dependency passing, providers, when context helps.
- Lesson 13: Custom hooks
  Concept focus: reusable stateful logic, hook rules, naming.
- Lesson 14: Refs
  Concept focus: instance-like values, DOM access, avoiding rerenders.
- Lesson 15: Effects
  Concept focus: synchronization with external systems.
- Lesson 16: You might not need an effect
  Concept focus: deriving during render, event logic, resetting with keys.

## Phase 3: Real App Architecture

- Lesson 17: Routing
  Concept focus: route tree, layouts, params, navigation, URL state.
- Lesson 18: API data is server state
  Concept focus: loading, error, cache, invalidation.
- Lesson 19: TanStack Query
  Concept focus: queries, mutations, query keys, stale data, refetching.
- Lesson 20: Global client state
  Concept focus: what belongs outside local components.
- Lesson 21: Redux Toolkit
  Concept focus: slices, reducers, actions, selectors, dispatch.
- Lesson 22: Forms in production
  Concept focus: validation, touched fields, submit state, server errors.
- Lesson 23: Authentication and permissions
  Concept focus: auth state, protected routes, token/session boundaries.
- Lesson 24: Error boundaries and fallback UI
  Concept focus: render failures vs async failures.

## Phase 4: Advanced React Judgment

- Lesson 25: Composition patterns
  Concept focus: children, slots, render props, component boundaries.
- Lesson 26: Performance basics
  Concept focus: rerenders, memoization, `memo`, `useMemo`, `useCallback`.
- Lesson 27: Performance profiling
  Concept focus: measuring before optimizing.
- Lesson 28: Suspense and async UI
  Concept focus: pending states, boundaries, streaming concepts if relevant.
- Lesson 29: Testing React components
  Concept focus: user-focused tests, mocking network boundaries.
- Lesson 30: Reading a full feature end to end
  Concept focus: route, component tree, state, server data, side effects, tests.

## Package Rule

Packages are taught when they solve a real category of problem:

- React Router: when the URL decides what UI renders.
- TanStack Query: when data comes from a server and needs caching or synchronization.
- Redux Toolkit: when client-side state is shared, structured, and hard to manage locally.
- Form libraries: when form state and validation become bigger than one or two inputs.
- Testing libraries: when behavior needs protection from regressions.

## Current Dependency On `xley-frontend`

The course can start with small examples immediately. For real-code lessons, the next step is to locate `xley-frontend` and inspect its `package.json`, routes, pages, hooks, and state/data libraries.
