# DSA Glossary

Canonical terminology for Data Structures, Algorithms, and Problem Solving. Terms are added here only after the learner has demonstrated understanding.

## Core Concepts

- **UMPIRE Framework**: A 6-step systematic problem-solving methodology used to break down coding interview questions before jumping into code:
  - **U**nderstand: Ask clarifying questions and define edge cases and sample inputs/outputs.
  - **M**atch: Identify pattern similarities (e.g., Two Pointers, Hash Map, Sliding Window).
  - **P**lan: Write out a step-by-step plain English algorithm or pseudocode.
  - **I**mplement: Translate the written plan into clean JavaScript code.
  - **R**eview: Line-by-line trace your solution with a test case to catch bugs.
  - **E**valuate: State time and space complexity using Big O notation.

- **Big O Notation ($O$)**: A metric measuring how the execution time or auxiliary memory of an algorithm scales as input size ($n$) grows toward infinity, ignoring hardware speeds and constants.
  - **$O(1)$ Constant Time**: Execution time is flat and immediate regardless of input size (e.g., array index lookup `arr[0]`, `.push()`, Map/Set lookups).
  - **$O(n)$ Linear Time**: Execution time grows proportionally with input size (e.g., single `for...of` loop, `.map()`, `.filter()`, `.indexOf()`).
  - **$O(n^2)$ Quadratic Time**: Execution time grows proportional to the square of input size (e.g., nested loops checking every pair in an array).
- **Space Complexity**: The auxiliary RAM/memory allocated by an algorithm during execution ($O(1)$ in-place modification vs $O(n)$ creating new arrays/objects).
