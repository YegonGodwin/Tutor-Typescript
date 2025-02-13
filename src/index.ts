// index.ts
interface QuizAnswer {
    question: string;
    correctAnswer: string;
  }
  
  const quizAnswers: QuizAnswer[] = [
    { question: "q1", correctAnswer: "A" }, // Paris
    { question: "q2", correctAnswer: "B" }, // Mars
    { question: "q3", correctAnswer: "C" }, // Pacific
    { question: "q4", correctAnswer: "B" }, // William Shakespeare
    { question: "q5", correctAnswer: "A" }, // H2O
    { question: "q6", correctAnswer: "B" }, // 2
    { question: "q7", correctAnswer: "B" }, // 4
  ];
  
  let timeLeft = 30;
  let timerInterval: number;
  
  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--;
      document.getElementById("time")!.textContent = timeLeft.toString();
  
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        submitQuiz();
      }
    }, 1000);
  }
  
  function updateProgress() {
    const answeredQuestions = document.querySelectorAll('input[type="radio"]:checked').length;
    const progress = (answeredQuestions / quizAnswers.length) * 100;
    document.getElementById("progress")!.style.width = `${progress}%`;
  }
  
  function showFeedback(isCorrect: boolean) {
    const feedbackDiv = document.getElementById("feedback") as HTMLDivElement;
    feedbackDiv.textContent = isCorrect ? "Correct! 🎉" : "Incorrect! ❌";
    feedbackDiv.style.color = isCorrect ? "#4CAF50" : "#d9534f";
  }
  
  function submitQuiz() {
    clearInterval(timerInterval);
    let score = 0;
  
    quizAnswers.forEach((answer) => {
      const selectedAnswer = (
        document.querySelector(`input[name="${answer.question}"]:checked`) as HTMLInputElement
      )?.value;
  
      if (selectedAnswer === answer.correctAnswer) {
        score++;
      }
    });
  
    const resultDiv = document.getElementById("result") as HTMLDivElement;
    resultDiv.textContent = `Your score is ${score} out of ${quizAnswers.length}`;
    document.getElementById("quizForm")!.style.display = "none";
  }
  
  document.getElementById("quizForm")?.addEventListener("submit", (event) => {
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