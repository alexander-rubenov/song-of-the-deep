'use strict';


let
  buttonToStartGame = document.querySelector('.submit-form'),
  startMenuPage = document.querySelector('.main-first'),
  gamePage = document.querySelector('.main-second'),
  username = document.querySelector('#username'),
  sectionRulesOfGame = document.querySelector('#section-rules-of-game'),
  buttonEverythingIsClear = document.querySelector('.submit-rules'),
  submarine = document.querySelector('.submarine'),
  gameField = document.querySelector('.game-field'),
  gameFieldHeader = document.querySelector('.game-header'),
  body = document.body;


function changeSectionNameEntryToSectionRulesOfGame() {
  sectionRulesOfGame.style.display = `block`;
  startMenuPage.style.marginTop = `-55vw`;
};

buttonToStartGame.addEventListener(`click`, changeSectionNameEntryToSectionRulesOfGame);


function changeStartMenuPageToGamePage() {
  submarine.style.left = `100vw`;
  startMenuPage.style.opacity = `0`;
  body.style.backgroundImage = `url("img/game-background.jpg")`;

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

  setInterval(() => {
    createFish();
  }, 1700);
};

buttonEverythingIsClear.addEventListener(`click`, changeStartMenuPageToGamePage);


function createFish() {
  let
    fish = document.createElement(`img`),
    fishSerialNumber = getRandomInt(1, 5);

  fish.classList.add(`js-fish`);
  fish.setAttribute(`src`, `img/fish_${fishSerialNumber}.png`);

  if (fishSerialNumber == 5) fish.style.width = `4vw`;

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
      startLeft = -9;
      startTop = 12;
      break;
    case 2:
      startLeft = -9;
      startTop = 26;
      break;
    case 3:
      startLeft = 25;
      startTop = 46;
      break;
    case 4:
      startLeft = 75;
      startTop = 46;
      break;
    case 5:
      startLeft = 100;
      startTop = 12;
      break;
    case 6:
      startLeft = 100;
      startTop = 26;
  };

  fish.style.left = startLeft + `vw`;
  fish.style.top = startTop + `vw`;
  
  gameField.appendChild(fish);

  setInterval(() => {
    fish.style.left = parseInt(fish.style.left) + getNumberSignToLeft() + `vw`;
    fish.style.top = parseInt(fish.style.top) + getNumberSignToTop() + `vw`;
  }, 700);

  function getNumberSignToTop() {
    if ((fish.offsetTop / gameFieldHeight * 100) <= 20) return getRandomInt(4, 8);
    if ((fish.offsetTop / gameFieldHeight * 100) >= 80) return getRandomInt(-4, -8);

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

  function getNumberSignToLeft() {
    if ((fish.offsetLeft / gameFieldWidth * 100) <= 9) return getRandomInt(4, 8);
    if ((fish.offsetLeft / gameFieldWidth * 100) >= 91) return getRandomInt(-4, -8);
    console.log(`Left: ` + (fish.offsetLeft / gameFieldWidth * 100));

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






/*
  * При нажатии на кнопку "Начать игру" снизу проплывает субмарина, а после исчезает медленно фон меню и появляется фон игры медленно
  * появляются правила игры с кнопкой "понятно", после нажатия на нее запускается игра  

  * при вводе имени игрока и нажатии на кнопку играть высвечиваются правила игры и кнопка "Всё понятно, поехали"

*/