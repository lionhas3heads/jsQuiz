let currentQuestion = 0;
let timer;
let time = 20;
let score = 0;

const questionBoxEl = document.querySelector('.question-box');
const answersWrapperEl = document.querySelector('.answer-wrapper');
const timerBoxEl = document.querySelector('#timer-box');
const scoreBoxEl = document.querySelector('#score-box');
const startBtnEl = document.querySelector('#start-button');

function saveScore() {
  const name = prompt('Please input your name.')

    if (name !== '') {
    let highScores = 
    JSON.parse(window.localStorage.getItem('highscores')) ||[]; 
    const savedScore = {
      name: name,
      score: score,
    };

    console.log(savedScore);

    highScores.push(savedScore);

    window.localStorage.setItem('highscores', JSON.stringify
    (highScores));

    const scoreBoardEl = document.createElement('div');
    scoreBoardEl.classList.add('score-board');
    const scoreBoardTitleEl = document.createElement('h5');

    const quizWrapperEl = document.querySelector('.quiz-wrapper');

    for (i = 0; i < highScores.length; i++) {
      const scoreBoxEl = document.createElement('div');
      const nameEl = document.createElement('p');
      const scoreEl = document.createElement('p');

      scoreBoxEl.setAttribute(
        'style',
        'display: flex; align-items: center; justify-content: center; gap: 1rem; flex-direction: row-reverse;'

      );

      nameEl.textContent = highScores[i].name;
      scoreBoxEl.textContent = highScores[i].score;

      scoreBoxEl.appendChild(scoreEl);
      scoreBoxEl.appendChild(nameEl);

      scoreBoardEl.appendChild(scoreBoxEl);

    }

    quizWrapperEl.appendChild(scoreBoardEl);

    const saveScoreBtnEl = document.querySelector
    ('#save-score-btn');

    saveScoreBtnEl.classList.add('hidden');

  }
}

function quizEnd() {
  clearInterval(timer);

  score = score + time * 0.5;

  scoreBoxEl.textContent = score;

  questionBoxEl.textContent = `Quiz Over! Your score is ${score}`;

  answersWrapperEl.classList.add('hidden');

  const saveScoreBtnEl = document.createElement('button');
  saveScoreBtnEl.setAttribute('id', 'save-score-btn');
  saveScoreBtnEl.textContent = 'Click to Save Score';

  const quizWrapperEl = document.querySelector('.quiz-wrapper');
  quizWrapperEl.appendChild(saveScoreBtnEl);

  saveScoreBtnEl.addEventListener('click', saveScore)

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
  scoreBoxEl.textContent = score;

  getQuestion();
}

function answerClick(event) {
  const target = event.target;

  console.log(target);

  if (target.tagName !== 'BUTTON') {
    return null
  }

  if (target.textContent !== questions[currentQuestion].       answer) {
    time -=2;

    if (time < 0) {
      time = 0
    } 

    timerBoxEl.textContent = time;

  } else {
    score =+ 2;
    scoreBoxEl.textContent = score;
  }

  currentQuestion++;

  if (time <= 0 || currentQuestion === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

startBtnEl.addEventListener('click', startQuiz);

answersWrapperEl.addEventListener('click', answerClick);