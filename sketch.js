/*
to do:
add score
make the bots and all the FFFFFFFFFFFUUUUUUUUUUUUUUUUUNNNNNNNNNN

gameEnd();
just save score (fitness) to the bot
or display score

if a tile is 10 make sure it says you win
add points for th9is

make weighted values

bug test the game

*/




//ai values
console.log('Hello World');

var populationSize = 100;
var generation = 0;
var currentBot = 0;
var botList = [];
var bestBot = [];

var archive = {
  populationSize: 0,
  currentGeneration: 0,
  highestScoreres: [],
  botList: []
}

//game values
var grid = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
];
var score = 0;
var moveNum = 0;
var canMove = false;
var currentTile = {x: 0, y: 0, num:0};
var oldTile = 0;
var zeroExists = false;
var x = 0; var y = 0;

document.onLoad = initialize();

function initialize() {
  initTiles(); initTiles();
}

function initTiles() {
  //make a dict for a new tile
  var newNum = 1;
  var newTile = {x: 0, y: 0, num: undefined};
  if(Math.random() < .1) {
    newNum = 2;
  }
  newTile.x = Math.ceil(Math.random()*4-1);
  newTile.y = Math.ceil(Math.random()*4-1);
  newTile.num = newNum;
  console.log(newTile.y,newTile.x,newTile.num);
  if(grid[newTile.y][newTile.x] === 0) {
    grid[newTile.y][newTile.x] = newTile.num;
    draw();
  } else {
    initTiles();
  }
}

function draw() {
  console.log('drawing');
  var html = '';
  for(i = 0; i < grid.length; i++) {
    html += grid[i] + '<br>';
  }
  //make for loop otherwise it starts replacing 44 etc.   THIS IS HORRIBLE
  html = replaceAll(html, ',', ' ');
  html = replaceAll(html, '0', '<span style=\'color: #444;\'>0</span>');
  html = replaceAll(html, '1', '<span style=\'color: #666;\'>1</span>');
  html = replaceAll(html, '2', '<span style=\'color: #997;\'>2</span>');
  html = replaceAll(html, '3', '<span style=\'color: #963;\'>3</span>');

  var scoreId = document.getElementById('score');
  scoreId.innerHTML = 'SCORE: ' + score;

  var gridId = document.getElementById('grid');
  gridId.innerHTML = html;
  }

function replaceAll(target, search, replacement) {
  return target.replace(new RegExp(search, 'g'), replacement);
}

window.onkeydown = e
function e(event){
  console.log('event.keyCode: ' + event.keyCode)
  if (event.keyCode == 37) {
    slideLeft();
  }else if (event.keyCode == 38) {
    slideUp();
  }else if (event.keyCode == 39) {
    slideRight();
  }else if (event.keyCode == 40) {
    slideDown();
  }
}

function slideLeft() {
  checkEnd();
  for(x = 1; x < 4; x++) {
    for(y = 0; y < 4; y++) {
      if(grid[y][x] != 0) {
        while(x > 0 && grid[y][x-1] == 0) {
          oldTile = grid[y][x];
          grid[y][x] = 0;
          grid[y][x-1] = oldTile;
          x--;
          if(x==0) {
            x = 1;
          }
          draw();
        }
        if(grid[y][x] == grid[y][x-1]) {
          score += grid[y][x]*2
          grid[y][x] = 0;
          grid[y][x-1] = grid[y][x-1] + 1;
          draw();
        }
      }
    }
  }
}

function slideUp() {
  checkEnd();
  for(y = 1; y < 4; y++) {
    for(x = 0; x < 4; x++) {
      if(grid[y][x] != 0) {
        while(y > 0 && grid[y-1][x] == 0) {
          oldTile = grid[y][x];
          grid[y][x] = 0;
          grid[y-1][x] = oldTile;
          y--;
          if(y==0) {
            y = 1;
          }
          draw();
        }
        if(grid[y][x] == grid[y-1][x]) {
          score += grid[y][x]*2
          grid[y][x] = 0;
          grid[y-1][x] = grid[y-1][x] + 1;
          draw();
        }
      }
    }
  }
}

function slideRight() {
  checkEnd();
  for(x = 2; x > -1; x--) {
    for(y = 0; y < 4; y++) {
      if(grid[y][x] != 0) {
        while(x < 3 && grid[y][x+1] == 0) {
          moveMade = true;
          oldTile = grid[y][x];
          grid[y][x] = 0;
          grid[y][x+1] = oldTile;
          x++;
          if(x==3) {
            x = 2;
          }
          draw();
        }
        if(grid[y][x] == grid[y][x+1]) {
          score += grid[y][x]*2
          grid[y][x] = 0;
          grid[y][x+1] = grid[y][x+1] + 1;
          draw();
        }
      }
    }
  }
}

function slideDown() {
  checkEnd();
  for(y = 2; y > -1; y--) {
    for(x = 0; x < 4; x++) {
      if(grid[y][x] != 0) {
        while(y < 3 && grid[y+1][x] == 0) {
          moveMade = true;
          oldTile = grid[y][x];
          grid[y][x] = 0;
          grid[y+1][x] = oldTile;
          y++;
          if(y==3) {
            y = 2;
          }
          draw();
        }
        console.log(y,x,grid[y][x])
        if(grid[y][x] == grid[y+1][x]) {
          score += grid[y][x]+grid[y+1][x]
          grid[y][x] = 0;
          grid[y+1][x] = grid[y+1][x] + 1;
          draw();
        }
      }
    }
  }
}

function reset() {
  grid = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
  ];
  draw();
}

function checkEnd() {
  console.log('checkEnd');
  for(x = 0; x < 4; x++) {
    for(y = 0; y < 4; y++) {
      if(grid[y][x] == 0){
        zeroExists = true;
      }
    }
  }
  if(!zeroExists){
    canMove = false;
    for(y = 0; y < 4; y++) {
      for(x = 1; x < 4; x++) {
        if(grid[y][x] == grid[y-1][x]) {
          canMove = true;
        }
      }
    }
    if(!canMove) {
      for(x = 1; x < 4; x++) {
        for(y = 0; y < 4; y++) {
          if(grid[y][x] == grid[y][x-1]) {
            canMove = true;
          }
        }
      }
    }
    if(!canMove) {
      gameEnd();
      alert('LOSER');
    }
  } else {
    initTiles();
  }
}

function gameEnd() {
  //gamescore to bot
  alert('You\'re score is ' + score);
}
