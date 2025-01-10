const questions = [
  {
      question: "1) What is the capital of India?",
      options: ["Bangalore", "Madhya Pradesh", "New Delhi", "West Bengal"],
      answer: 2,
  },
  {
      question: "2) Who wrote 'Merchant of Venice'?",
      options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
      answer: 1,
  },
  {
      question: "3) What is the square root of 144?",
      options: ["11", "17", "12", "9"],
      answer: 2,
  },
  {
      question: "4) Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: 1,
  },
  {
      question: "5) What is the chemical symbol for water?",
      options: ["H2O", "CO2", "O2", "NaCl"],
      answer: 0,
  },
  {
      question: "6) Who painted the Mona Lisa?",
      options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Claude Monet"],
      answer: 2,
  },
  {
      question: "7) Which is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      answer: 3,
  },
  {
      question: "8) What is the capital city of West Bengal?",
      options: ["Darjeling", "Purulia", "Kolkata", "Durgapur"],
      answer: 2,
  },
  {
      question: "9) Which element is known as the king of chemicals?",
      options: ["Oxygen", "Sulfuric Acid", "Hydrogen", "Carbon"],
      answer: 1,
  },
  {
      question: "10) What is the speed of light in a vacuum?",
      options: ["3,00,000 km/s", "1,00,000 km/s", "5,00,000 km/s", "2,00,000 km/s"],
      answer: 0,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const quizContainer = document.getElementById("quiz-container");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const timerEl = document.getElementById("time");

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("option");
      button.addEventListener("click", () => selectOption(index));
      optionsEl.appendChild(button);
  });
  nextBtn.disabled = true;
  startTimer();
}

function selectOption(selectedIndex) {
  clearInterval(timerInterval);
  const currentQuestion = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll(".option");
  buttons.forEach((button, index) => {
      button.disabled = true;
      if (index === currentQuestion.answer) {
          button.classList.add("correct");
      } else if (index === selectedIndex) {
          button.classList.add("wrong");
      }
  });
  if (selectedIndex === currentQuestion.answer) {
      score++;
  }
  nextBtn.disabled = false;
}

function showResult() {
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
  scoreEl.textContent = `${score}/${questions.length}`;
}

function restartQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  quizContainer.style.display = "block";
  resultContainer.style.display = "none";
  loadQuestion();
}

function startTimer() {
  timeLeft = 10;
  timerEl.textContent = timeLeft;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
      if (timeLeft <= 0) {
          clearInterval(timerInterval);
          selectOption(-1);
          nextBtn.disabled = false;}
  }, 1000);
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
      loadQuestion();
  } else {
      showResult();
  }
});

restartBtn.addEventListener("click", restartQuiz);

loadQuestion();
