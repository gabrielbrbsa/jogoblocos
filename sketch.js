let cols = 6; // Número de colunas
let rows = cols; // Número de linhas
let tileSize; // Tamanho do módulo
let patterns = []; // Matriz para armazenar os padrões de cada módulo
let currentIndex = 0; // Índice usado para sequência linear
let giro = []; // Array para armazenar as cores disponíveis

var bloco1, bloco2, bloco3, bloco4, bloco5, bloco6;

function preload() {
  bloco1 = loadImage("img/Blocos-01.jpg")
  bloco2 = loadImage("img/Blocos-02.jpg")
  bloco3 = loadImage("img/Blocos-03.jpg")
  bloco4 = loadImage("img/Blocos-04.jpg")
  bloco5 = loadImage("img/Blocos-05.jpg")
  bloco6 = loadImage("img/Blocos-07.jpg")
}

function setup() {
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  tileSize = width / cols;
  initializeGiro();
  initializePatterns();
  drawPattern();
  noStroke();
  imageMode(CENTER);
}

function draw() {
  // Nada acontece no loop draw
}

function initializeGiro() {
  giro.push(0);
  giro.push(HALF_PI);
  giro.push(PI);
  giro.push(HALF_PI * 3);
}

function initializePatterns() {
  for (let i = 0; i < cols; i++) {
    patterns[i] = [];
    for (let j = 0; j < rows; j++) {
      patterns[i][j] = {
        giroIndex: floor(random(giro.length)),
        shapeIndex: floor(random(6))
      };
    }
  }
}

function drawPattern() {
  background(255);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * tileSize;
      let y = j * tileSize;
      drawModule(x, y, tileSize, patterns[i][j].shapeIndex, giro[patterns[i][j].giroIndex]);
    }
  }
}

function drawModule(x, y, size, choice, angulo) {
  push();
  translate(x + size / 2, y + size / 2);
  rotate(angulo);
  switch (choice) {
    case 0:
      image(bloco1, 0, 0, size, size);
      break;
    case 1:
      image(bloco2, 0, 0, size, size);
      break;
    case 2:
      image(bloco3, 0, 0, size, size);
      break;
    case 3:
      image(bloco4, 0, 0, size, size);
      break;
    case 4:
      image(bloco5, 0, 0, size, size);
      break;
    case 5:
      image(bloco6, 0, 0, size, size);
      break;
  }
  pop();
}

function mouseClicked() {
  if (keyIsDown(SHIFT)) {
    let clickedCol = floor(mouseX / tileSize);
    let clickedRow = floor(mouseY / tileSize);
    patterns[clickedCol][clickedRow].giroIndex = (patterns[clickedCol][clickedRow].giroIndex + 1) % giro.length;
    drawPattern();
  } else {
    let clickedCol = floor(mouseX / tileSize);
    let clickedRow = floor(mouseY / tileSize);
    patterns[clickedCol][clickedRow].shapeIndex = (patterns[clickedCol][clickedRow].shapeIndex + 1) % 6;
    drawPattern();
  }
}
