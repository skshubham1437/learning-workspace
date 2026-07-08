document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-answer]");
  if (!button) return;

  const quiz = button.closest("[data-quiz]");
  if (!quiz) return;

  const feedback = quiz.querySelector("[data-feedback]");
  const buttons = quiz.querySelectorAll("[data-answer]");
  const isCorrect = button.dataset.answer === "correct";

  buttons.forEach((item) => {
    item.classList.remove("correct", "wrong");
    item.setAttribute("aria-pressed", "false");
  });

  button.classList.add(isCorrect ? "correct" : "wrong");
  button.setAttribute("aria-pressed", "true");

  if (feedback) {
    feedback.textContent = isCorrect
      ? quiz.dataset.correctFeedback
      : quiz.dataset.wrongFeedback;
  }
});
