// Initialize state variables
let score = 0;
let answered = 0;

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Quiz Logic (if present on current page)
    initQuiz();
});

function initQuiz() {
    const quizButtons = document.querySelectorAll(".quiz-btn");
    
    // Guard clause: Exit if not on the simulator page
    if (quizButtons.length === 0) return;

    // Reset counters when starting/re-initializing quiz
    score = 0;
    answered = 0;

    quizButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (btn.disabled) return;

            if (btn.dataset.answer === "correct") {
                handleCorrect(btn);
            } else {
                handleWrong(btn);
            }
        });
    });
}

function handleCorrect(button) {
    score++;
    answered++;

    button.classList.add("correct");
    button.textContent = "✔ Correct";

    showFeedback(button, "✅ Excellent decision. This helps contain the incident quickly.");
    disableGroup(button);
    updateResults();
}

function handleWrong(button) {
    answered++;

    button.classList.add("wrong");
    button.textContent = "✖ Incorrect";

    showFeedback(button, "⚠️ This decision would increase the impact of the cyberattack.");
    disableGroup(button);
    updateResults();
}

function showFeedback(button, message) {
    const parent = button.closest(".question-card") || button.parentElement;
    const feedback = parent.querySelector(".feedback");
    
    if (feedback) {
        // Use textContent instead of innerHTML to prevent potential XSS
        feedback.textContent = message;
        feedback.classList.add("visible");
    }
}

function disableGroup(button) {
    const parent = button.closest(".question-card") || button.parentElement;
    const buttons = parent.querySelectorAll("button");
    
    buttons.forEach((btn) => {
        btn.disabled = true;
    });
}

function updateResults() {
    const resultContainer = document.getElementById("result");
    if (!resultContainer) return;

    // Dynamically calculate total questions instead of hardcoding 5
    const totalQuestions = document.querySelectorAll(".question-card, .quiz-question").length || 5;

    // Initial score text output safely set via textContent
    resultContainer.textContent = `Score: ${score} / ${totalQuestions}`;

    if (answered === totalQuestions) {
        let finalMarkup = "";

        if (score === totalQuestions) {
            finalMarkup = `
                <div class="result-box success">
                    <h3>🏆 Congratulations!</h3>
                    <p>You scored ${score}/${totalQuestions} and successfully managed the cyber crisis.</p>
                    <hr>
                    <p><strong>Certificate Awarded: Incident Commander</strong></p>
                </div>
            `;
        } else if (score >= Math.ceil(totalQuestions * 0.6)) {
            finalMarkup = `
                <div class="result-box warning">
                    <h3>👍 Great Job!</h3>
                    <p>Your score was ${score}/${totalQuestions}. You made good decisions, but there is room for improvement.</p>
                </div>
            `;
        } else {
            finalMarkup = `
                <div class="result-box danger">
                    <h3>⚠️ Action Required</h3>
                    <p>Score: ${score}/${totalQuestions}. Your decisions allowed the attack to cause greater disruption.</p>
                    <p>Review the incident response process and try again.</p>
                </div>
            `;
        }

        resultContainer.innerHTML = finalMarkup;
    }
}
