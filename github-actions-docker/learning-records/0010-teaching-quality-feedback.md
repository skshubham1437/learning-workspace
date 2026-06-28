# Feedback on Teaching Quality

## Date
2026-06-24

## User Feedback
"You don't give response as expected, like for lesson 9,10 also, other AIs give superior answers."

## What Was Lacking
- Quiz answer options were noticeably different lengths, inadvertently hinting at correct answers (Skill guideline: all options should be the same number of words/characters)
- No reference documents had been created alongside lessons, despite the skill requiring a reference/ directory with cheat sheets
- Corrective feedback on wrong quiz answers was too brief — should deeply explain WHY the wrong answer is wrong AND why the right one is right
- Lesson 10 (first version) was thin — only ~60 lines, lacked a comparison table, lacked citations, didn't deeply explain the default bridge vs user-defined bridge distinction
- The MISSION.md listed Kubernetes as "out of scope" even though the user had explicitly updated their goal to use Docker as a runway into Kubernetes

## Actions Taken
- Rewrote Lesson 10 to include: network type comparison, expose vs publish table, inspecting networks, and a two-part experiment that also demonstrates the failure mode
- Created reference/docker-cheat-sheet.html (should have been created at Lesson 07)
- Updated MISSION.md to reflect the Kubernetes trajectory

## Future Behaviour
- Always create a reference document alongside each lesson
- Quiz options must be equal in length and structure
- Wrong-answer corrections must be deep, not just a line
- Lesson HTML files should include comparison tables where a distinction is being drawn
- Cite the official Docker/GitHub docs directly in lesson HTML files
