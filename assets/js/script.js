let currentQuestion = 0;
let timer;
let time = 20;

const questionBoxEl = document.querySelector('.question-box');
const answersWrapperEl = document.querySelector('.answer-wrapper');
const timerBoxEl = document.querySelector('#timer-box');
const scoreBoxEl = document.querySelector('#score-box');
const startBtnEl = document.querySelector('#start-button');

function quizEnd() {
  clearInterval(timer);
}

function countdown() {
  time--;
  timerBoxEl.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
}

function getQuestion() {
  let currentQuestionObject = questions[currentQuestion];

  questionBoxEl.textContent = currentQuestionObject.title;

  for (i = 0; i < currentQuestionObject.choices.length; i++) {
    answersWrapperEl.children[i].textContent = currentQuestionObject.choices[i];
  }
}

function startQuiz() {
  startBtnEl.classList.add('hidden');
  answersWrapperEl.classList.remove('hidden');

  timer = setInterval(countdown, 1000);
  timerBoxEl.textContent = time;

  getQuestion();
}

startBtnEl.addEventListener('click', startQuiz);