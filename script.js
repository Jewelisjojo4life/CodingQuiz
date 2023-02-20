let startButton = document.getElementById("start-btn");
let nextButton = document.getElementById("next-btn");
let questionContainerElement = document.getElementById("question-container");
let questionElement = document.getElementById("question");
let answerButtonsElement = document.getElementById("answer-buttons");
let shuffledQuestions, currentQuestionIndex;
let correctWrong = document.getElementById("correct-wrong");
let timerEl = document.getElementById("time");
let resultBox = document.getElementById("resultBox-container");
let correctAnswers = 0;
let restartButton = document.getElementById("restart-btn");
document.getElementById("start-btn").addEventListener("click", function () {
  var timeleft = 120;

  var downloadTimer = setInterval(function function1() {
    document.getElementById("countdown").innerHTML =
      timeleft + "seconds remaining";
    timeleft -= 1;

    if (timeleft <= -2) {
      clearInterval(downloadTimer);
      startButton.classList.remove("hide");
      document.getElementById("countdown").innerHTML = "Times up!";

      alert("Times up!! :(");
    }
  }, 1000);
});

let start = document.querySelector("#start");
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", clearInterval);

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    correctAnswers++;
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
    resultBox.classList.remove("hide");
  } else {
    resultBox.innerText =
      correctAnswers.toString() + "/" + shuffledQuestions.length.toString();

    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

let questions = [
  {
    question: "What does a Boolean have",
    answers: [
      { text: "True false", correct: true },
      { text: "numbers", correct: false },
    ],
  },
  {
    question: "What does css stand for",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Catching Style Sheets", correct: false },
      { text: "Colorful Style Sheets", correct: false },
      { text: "Case Style Sheets", correct: false },
    ],
  },
  {
    question: "If else statements are encloses in what?",
    answers: [
      { text: "curly brackets", correct: false },
      { text: "parenthesis", correct: true },
      { text: "nothing", correct: false },
      { text: "quatations", correct: false },
    ],
  },
  {
    question: "Java is different than Javascript",
    answers: [
      { text: "no", correct: false },
      { text: "yes", correct: true },
    ],
  },
];
