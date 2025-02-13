"use strict";
var _a;
const quizAnswers = [
    { question: "q1", correctAnswer: "A" }, // Paris
    { question: "q2", correctAnswer: "B" }, // Mars
    { question: "q3", correctAnswer: "C" }, // Pacific
    { question: "q4", correctAnswer: "B" }, // William Shakespeare
    { question: "q5", correctAnswer: "A" }, // H2O
    { question: "q6", correctAnswer: "B" }, // 2
    { question: "q7", correctAnswer: "B" }, // 4
];
let timeLeft = 30;
let timerInterval;
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft.toString();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}
function updateProgress() {
    const answeredQuestions = document.querySelectorAll('input[type="radio"]:checked').length;
    const progress = (answeredQuestions / quizAnswers.length) * 100;
    document.getElementById("progress").style.width = `${progress}%`;
}
function showFeedback(isCorrect) {
    const feedbackDiv = document.getElementById("feedback");
    feedbackDiv.textContent = isCorrect ? "Correct! 🎉" : "Incorrect! ❌";
    feedbackDiv.style.color = isCorrect ? "#4CAF50" : "#d9534f";
}
function submitQuiz() {
    clearInterval(timerInterval);
    let score = 0;
    quizAnswers.forEach((answer) => {
        var _a;
        const selectedAnswer = (_a = document.querySelector(`input[name="${answer.question}"]:checked`)) === null || _a === void 0 ? void 0 : _a.value;
        if (selectedAnswer === answer.correctAnswer) {
            score++;
        }
    });
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = `Your score is ${score} out of ${quizAnswers.length}`;
    document.getElementById("quizForm").style.display = "none";
}
(_a = document.getElementById("quizForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (event) => {
    event.preventDefault();
    submitQuiz();
});
document.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.addEventListener("change", () => {
        updateProgress();
    });
});
startTimer();
updateProgress();
//# sourceMappingURL=index.js.map