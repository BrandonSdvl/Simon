"use strict";

var leaderboards = document.getElementById('leaderboards');
var table = document.getElementById('table');
var players = JSON.parse(localStorage.getItem('players'));
var currentPlayer = '';
var currentScore = '';
var position = 0;
leaderboards.addEventListener('click', function (e) {
  if (e.target.id != null) {
    document.getElementById('arrow').classList.toggle('icon--rotate');
    table.classList.toggle('table--show');
  }
});

var loadLearederboards = function loadLearederboards() {
  var fragment = document.createDocumentFragment();

  for (var i in players) {
    var playerLeaderboard = document.createElement('div');
    var scoreLeaderboard = document.createElement('div');
    playerLeaderboard.textContent = players[i].name;
    scoreLeaderboard.textContent = players[i].level;
    playerLeaderboard.classList.add('player');
    scoreLeaderboard.classList.add('score');
    fragment.appendChild(playerLeaderboard);
    fragment.appendChild(scoreLeaderboard);
  }

  table.appendChild(fragment);
};

var setLeaderboards = function setLeaderboards() {
  // Avoid bugs
  if (level == 1 && players.length != 1 && position == 0) {
    position = players.length - 1;
  } // Check each item to see if it is bigger or smaller and sort the leaderboard


  for (var i in players) {
    if (level >= players[i].level && i != players.length - 1) {
      players.splice(position, 1);
      position = i;
      players.splice(i, 0, {
        name: name,
        level: level,
        dificult: dificult
      });
      return 0;
    }
  } // In case the level is te smallest only update the last element


  position = players.length - 1;
  players[players.length - 1] = {
    name: name,
    level: level,
    dificult: dificult
  };
};

var createPlayer = function createPlayer() {
  // Check if localStorage is empty and initialize it
  if (players == null) {
    players = [];
  } // Add a new element to the end of the array


  players.push({
    name: name,
    level: level,
    dificult: dificult
  }); // Update localStorage

  localStorage.setItem('players', JSON.stringify(players));
};

var main = document.getElementById('main');
var start = document.getElementById('start');
var levelHTML = document.getElementById('level');
var startConfirm = document.getElementById('startConfirm');
var input = document.getElementById('input');
var select = document.getElementById('select');
var pattern = [];
var userSlected = [];
var on = false;
var index = 0;
var level = 0;
var enabled = false;
var time = 500;
var gameOver = false;
var name = '';
var dificult = '';
loadLearederboards();
main.addEventListener('click', function (e) {
  if (e.target.id == 'start') {
    e.target.disabled = true;
    document.getElementById('lightbox').classList.add('lightbox--show');
  }

  if (enabled) {
    switch (e.target.id) {
      case 'green':
        userSlected.push('green');
        break;

      case 'red':
        userSlected.push('red');
        break;

      case 'yellow':
        userSlected.push('yellow');
        break;

      case 'blue':
        userSlected.push('blue');
        break;

      default:
        break;
    }

    validate();
  }
});
startConfirm.addEventListener('click', function (e) {
  e.preventDefault();
  name = input.value;
  dificult = select[select.selectedIndex].value;

  if (form.checkValidity()) {
    levelHTML.style.display = 'block';
    gameOver = false;
    document.getElementById('lightbox').classList.remove('lightbox--show');
    createPlayer();

    switch (dificult) {
      case 'easy':
        time = 1000;
        break;

      case 'medium':
        time = 600;
        break;

      case 'hard':
        time = 200;
        break;
    }

    setTimeout('setColor()', 500);
  } else if (name == '') {
    alert('Insert a name');
  }
});

var setColor = function setColor() {
  level += 1;
  setLeaderboards();
  localStorage.setItem('players', JSON.stringify(players));
  table.innerHTML = '<div class="table__header">Name</div><div class="table__header">Lvl</div>';
  loadLearederboards();
  start.innerHTML = '...';
  levelHTML.firstElementChild.innerHTML = level;
  var color = Math.floor(Math.random() * 4) + 1;

  switch (color) {
    case 1:
      pattern.push('green');
      break;

    case 2:
      pattern.push('red');
      break;

    case 3:
      pattern.push('yellow');
      break;

    case 4:
      pattern.push('blue');
      break;
  }

  var timer = setInterval(function () {
    if (index >= pattern.length) {
      console.log(pattern);
      index = 0;
      on = false;
      start.innerHTML = 'Select';
      document.getElementById('green').classList.add('green__enabled');
      document.getElementById('red').classList.add('red__enabled');
      document.getElementById('yellow').classList.add('yellow__enabled');
      document.getElementById('blue').classList.add('blue__enabled');
      enabled = true;
      clearInterval(timer);
    } else {
      if (on) {
        document.getElementById(pattern[index]).classList.remove("".concat(pattern[index], "__light"));
        on = false;
        index += 1;
      } else {
        document.getElementById(pattern[index]).classList.add("".concat(pattern[index], "__light"));
        on = true;
      }
    }
  }, time);
};

var validate = function validate() {
  var current = userSlected.length - 1;

  if (userSlected[current] == pattern[current]) {
    current += 1;
  } else {
    start.disabled = false;
    current = 0;
    start.innerHTML = 'Error';
    gameOver = true;
    reset();
  }

  if (current == pattern.length && !gameOver) {
    start.innerHTML = 'Correct';
    userSlected = [];
    document.getElementById('green').classList.remove('green__enabled');
    document.getElementById('red').classList.remove('red__enabled');
    document.getElementById('yellow').classList.remove('yellow__enabled');
    document.getElementById('blue').classList.remove('blue__enabled');
    enabled = false;
    setTimeout('setColor()', time);
  }
};

var reset = function reset() {
  pattern = [];
  userSlected = [];
  level = 0;
  start.innerHTML = 'Start';
  levelHTML.firstElementChild.innerHTML = level;
  levelHTML.style.display = 'none';
  currentPlayer = '';
  currentScore = '';
  position = 0;
  players = JSON.parse(localStorage.getItem('players'));
  table.innerHTML = '<div class="table__header">Name</div><div class="table__header">Lvl</div>';
  loadLearederboards();
};