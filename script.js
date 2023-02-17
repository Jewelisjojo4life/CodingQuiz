let startButton = document.getElementById("start-btn");
let nextButton = document.getElementById("next-btn");
let questionContainerElement = document.getElementById("question-container");
let questionElement = document.getElementById("question");
let answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
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
    let button = document.createElement("button");
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
  let selectedButton = e.target;
  let correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
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
    question: "The external JavaScript file must contain the <script> tag",
    answers: [
      { text: "false", correct: true },
      { text: "true", correct: false },
    ],
  },
  {
    question: " Which of the following is an advantage of using JavaScript?",
    answers: [
      { text: "Less server interation", correct: true },
      { text: "Immediate feedback", correct: true },
      { text: "Making the website interactive", correct: true },
      { text: "All of the above", correct: true },
    ],
  },
  {
    question: "what is a Bolean?",
    answers: [
      { text: "True False", correct: true },
      { text: "NaN", correct: false },
      { text: "numbers", correct: false },
      { text: "IDK", correct: false },
    ],
  },
  {
    question: "This quiz was fun",
    answers: [
      { text: "Yes", correct: true },
      { text: "Super Yes", correct: true },
    ],
  },
];
