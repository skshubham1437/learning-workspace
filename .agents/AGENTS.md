# Learning Workspaces — Agent Rules

This workspace contains multiple learning tracks. Each sub-folder is a self-contained teaching workspace governed by the `teach` skill.

## Workspace Navigation

- The root `TRACKER.md` is the source of truth for which tracks exist, their status, and lessons completed.
- When the user asks to switch tracks or start a new one, navigate to the respective directory and follow the `teach` skill instructions.
- Always read the target workspace's `MISSION.md`, `NOTES.md`, and `learning-records/` before doing anything — context from prior sessions is critical.

## Lesson Completion Workflow

When the user says a lesson is completed (e.g. "lesson 3 done", "I finished the CQRS lesson", "completed"):

### Step 1: Verify Understanding (Do NOT skip)

- Coverage is not learning. Ask 2-3 targeted comprehension questions about the lesson's core concepts.
- Questions should require recall, not recognition. Do not give multiple-choice unless the lesson was quiz-based.
- If the user struggles, help them understand the gaps before marking complete. Do not just move on.

### Step 2: Record the Learning

- Create a learning record in `./learning-records/` if the user demonstrated genuine understanding of something non-trivial. Follow the format in the teach skill.
- Update the glossary if new terms were solidified (not just introduced — the user must be able to use them correctly).

### Step 3: Update Progress

Perform ALL of the following updates:

1. **`NOTES.md`** → Update the "Progress Tracking" section:
   - Move any pending exercise to "Exercises Completed" with debrief notes
   - Update "Current Module" to reflect the new position
   - Add a session log entry with the date and what was covered

2. **Phase `README.md`** → If all lessons in a module are complete, mark the module checkbox `[x]` in the phase's status section.

3. **Root `TRACKER.md`** → Increment the "Lessons Completed" count for the active track. Update "Status" if phase changed.

### Step 4: Suggest What's Next

- Based on the mission, learning records, and zone of proximal development, suggest the next lesson topic.
- If the next topic has prerequisites listed in `NOTES.md`, check they're satisfied first. If not, design a prerequisite-filling lesson.
- If the user has pending exercises from a previous lesson, remind them before introducing new material.
- Give the user the choice: proceed to the next lesson now, or end the session.

## General Teaching Behavior

- Always bridge new concepts to the user's existing experience (Node.js monolith, Express, MySQL/MongoDB). Never explain from first principles what they already know.
- Show failure paths, not just happy paths. Production systems fail — teach how.
- Use Mermaid diagrams for architecture visuals. Use tradeoff tables instead of paragraph comparisons.
- Code examples must be production-quality. No `console.log("hello world")` tutorials.
- Every concept must connect back to the mission. If it doesn't, question whether it belongs.

## File Hygiene

- Never delete learning records — supersede them if understanding evolves.
- Never modify completed lesson HTML files unless explicitly asked.
- Keep `RESOURCES.md` pruned — remove resources that turned out to be low-quality after use.
- The `NOTES.md` session log is append-only. Never edit past session entries.

## Flashcards

- Automated flashcard generation is disabled.
- **Whenever you create a new lesson (HTML file) for any course**, you MUST immediately and manually append minimum 4-5 high-quality, concept-focused flashcards for that lesson into `./course-platform/flashcard-data.js`. Do not wait to be asked.
