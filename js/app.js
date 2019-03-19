'use strict';


let
  buttonToStartGame = document.querySelector('.submit-form'),
  startMenuPage = document.querySelector('.main-first'),
  gamePage = document.querySelector('.main-second'),
  usernameField = document.querySelector('#username'),
  sectionRulesOfGame = document.querySelector('#section-rules-of-game'),
  buttonEverythingIsClear = document.querySelector('.submit-rules'),
  submarine = document.querySelector('.submarine'),
  gameField = document.querySelector('.game-field'),
  gameFieldStartValue = gameField.innerHTML,
  gameFieldHeader = document.querySelector('.game-header'),
  body = document.body,
  username = document.querySelector('.player-name'),
  playerScore = document.querySelector('#player-score'),
  endTheGamePage = document.querySelector('.main-third'),
  sectionResultTable = document.querySelector('.block-result-table'),
  buttonResetTheGame = document.querySelector('.recurring'),
  timerId,
  timer = document.querySelector(`#timer`),
  timerStartValue = timer.innerHTML,
  buttonNextGame = document.querySelector('.submit-next-game'),
  screenWidth = document.documentElement.clientWidth,
  media = false;

if (screenWidth <= 480) media = true;

function changeSectionNameEntryToSectionRulesOfGame() {
  if (usernameField.value === '') {
    usernameField.style.border = `3px solid #e2534b`;
    setTimeout(() => {
      usernameField.style.border = '0.05vw solid #cccccc';
    }, 100);
    setTimeout(() => {
      usernameField.style.border = `3px solid #e2534b`;
    }, 200);
    return;
  }

  sectionRulesOfGame.style.display = `block`;
  if (media) startMenuPage.style.marginTop = `-125vw`;
  else startMenuPage.style.marginTop = `-55vw`;
};

buttonToStartGame.addEventListener(`click`, changeSectionNameEntryToSectionRulesOfGame);


function makingChangesToUsernameField() {
  usernameField.style.border = '0.05vw solid #cccccc';
};

usernameField.addEventListener('input', makingChangesToUsernameField);


function changeStartMenuPageToGamePage() {
  username.textContent = usernameField.value;

  submarine.style.left = `100vw`;
  startMenuPage.style.opacity = `0`;
  if (media) body.style.backgroundImage = `url("img/media-game-background.png")`;
    else body.style.backgroundImage = `url("img/game-background.jpg")`;

  setTimeout(() => {
    startMenuPage.style.display = `none`;
    gamePage.style.display = `block`;
  }, 1000);

  setTimeout(() => {
    gameFieldHeader.style.marginTop = `0`;
  }, 1100);

  setTimeout(() => {
    submarine.style.display = `none`;
  }, 1700);

  if (media) {
    setInterval(() => {
      if (gameField.children.length >= 40) return;
      createFish();
    }, 500);
  } else {
    setInterval(() => {
      if (gameField.children.length >= 40) return;
      createFish();
    }, 1700);
  };

  setTimeout(() => {
    startTimer();
  }, 2200);
};

buttonEverythingIsClear.addEventListener(`click`, changeStartMenuPageToGamePage);


function createFish() {
  let
    fish = document.createElement(`img`),
    fishSerialNumber = getRandomInt(1, 5);

  fish.classList.add(`js-fish`);
  fish.setAttribute(`src`, `img/fish-${fishSerialNumber}.png`);

  if (fishSerialNumber == 5) {
    if (media) fish.style.width = `11vw`;
    else fish.style.width = `4vw`;
  }

  chooseTrajectory(fish);
};

function chooseTrajectory(fish) {
  let numberOfTrajectory = getRandomInt(1, 6);
  let startLeft;
  let startTop;

  let gameFieldWidth = gameField.clientWidth;
  let gameFieldHeight = gameField.clientHeight;

  switch(numberOfTrajectory) {
    case 1:
      if (media) {
        startLeft = -25;
        startTop = 30;
      } else {
        startLeft = -9;
        startTop = 30;
      }
      break;
    case 2:
      if (media) {
        startLeft = -25;
        startTop = 70;
      } else {
        startLeft = -25;
        startTop = 70;
      }
      break;
    case 3:
      startLeft = 25;
      startTop = 100;
      break;
    case 4:
      startLeft = 75;
      startTop = 100;
      break;
    case 5:
      startLeft = 100;
      startTop = 70;
      break;
    case 6:
      startLeft = 100;
      startTop = 30;
  };

  fish.style.left = startLeft + `vw`;
  fish.style.top = startTop + `vh`;
  
  gameField.appendChild(fish);

  if (media) {
    setInterval(() => {
      fish.style.left = parseInt(fish.style.left) + getNumberSignToLeft() + `vw`;
      fish.style.top = parseInt(fish.style.top) + getNumberSignToTop() + `vh`;
    }, 300);
  } else {
    setInterval(() => {
      fish.style.left = parseInt(fish.style.left) + getNumberSignToLeft() + `vw`;
      fish.style.top = parseInt(fish.style.top) + getNumberSignToTop() + `vh`;
    }, 600);
  };

  function getNumberSignToLeft() {
    if (parseInt(fish.style.left) <= 9) return getRandomInt(4, 8);
    if (parseInt(fish.style.left) >= 85) return getRandomInt(-4, -8);

    let randomNumber = getRandomInt(1, 3);
    switch(randomNumber) {
      case 1:
        return getRandomInt(4, 8);
        break;
      case 2:
        return getRandomInt(-4, -8);
        break;
      case 3:
        return 0;
    };
  };

  function getNumberSignToTop() {
    if (parseInt(fish.style.top) <= 20) return getRandomInt(4, 8);
    if (parseInt(fish.style.top) >= 80) return getRandomInt(-4, -8);

    let randomNumber = getRandomInt(1, 3);
    switch(randomNumber) {
      case 1:
        return getRandomInt(4, 8);
        break;
      case 2:
        return getRandomInt(-4, -8);
        break;
      case 3:
        return 0;
    };
  };

};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


function removeFishFromGameField(event) {
  let target = event.target;

  if (target.tagName !== `IMG`) return;

  gameField.removeChild(target);
  let fishSerialNumber = +target.getAttribute('src').slice(9, 10);
  console.log(fishSerialNumber);
  if (fishSerialNumber === 1 || fishSerialNumber === 2 || fishSerialNumber === 3) playerScore.innerHTML = +playerScore.innerHTML + 30;
    else if (fishSerialNumber === 4) playerScore.innerHTML = +playerScore.innerHTML + 50;
    else if (fishSerialNumber === 5) playerScore.innerHTML = +playerScore.innerHTML + 100;
};

gameField.addEventListener('click', removeFishFromGameField)

function startTimer() {
  let
    time = timer.innerHTML,
    arr = time.split(`:`),
    m = arr[0],
    s = arr[1];

  if (s == 0) {
    if (m == 0) {
      // когда вышло время
      timeIsOver();
      return;
    };
    m--;
    if (m < 10) m = `0` + m;
    s = 59;
  } else s--;
  if (s < 10) s = `0` + s;
  if (m == 0 && s <= 15) timer.style.color = '#ff0000';
  document.querySelector(`#timer`).innerHTML = m+`:`+s;
  timerId = setTimeout(startTimer, 1000);
};

function timeIsOver() {
  body.style.backgroundImage = `url("img/start-page-background.png")`;
  gamePage.style.opacity = '0';

  let endTheGamePageUsername = document.querySelector('.end-the-game-page-username');
  let endTheGamePageScore = document.querySelector('.end-the-game-page-score');
  endTheGamePageScore.innerHTML = playerScore.innerHTML;

  endTheGamePageUsername.innerHTML = usernameField.value;

  setTimeout(() => {
    gamePage.style.display = 'none';
    endTheGamePage.style.display = 'block';
  }, 1000);

  setTimeout(() => {
    if (media) sectionResultTable.style.marginTop = '20vw';
    else sectionResultTable.style.marginTop = '10vw';
  }, 1050);
};

function resetTheGame() {
  clearTimeout(timerId);
  timer.innerHTML = timerStartValue;
  setTimeout(() => {
    startTimer();
  }, 1000);

  gameField.innerHTML = gameFieldStartValue;
  playerScore.innerHTML = 0;
};

buttonResetTheGame.addEventListener('click', resetTheGame);

buttonNextGame.addEventListener('click', () => {
  window.location.reload();
});

// добавить возможность выбора времени игры
// добавить возможность выбора сложности игры