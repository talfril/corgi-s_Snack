const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png";

const foodImages = ["img/food-1.png", "img/food-2.png", "img/food-3.png"];

const snakeHead = new Image();
snakeHead.src = "img/head.png";

const snakeTail = new Image();
snakeTail.src = "img/tail.png";

const snakeGhostTail = new Image();
snakeGhostTail.src = "img/tail-ghost.png";

let box = 32;

let score = 0;

function updateScore() {
  document.getElementById("score").textContent = score;
}

let cadrs = 0;

let food = {
  x: Math.floor(Math.random() * 18 + 1) * box,
  y: Math.floor(Math.random() * 18 + 1) * box,
  img: new Image(),
};

food.img.src = foodImages[Math.floor(Math.random() * foodImages.length)];

function gameOver() {
  clearInterval(game);
  updateScoreInDialog();
  dialog.showModal();
}

function restartGame() {
  score = 0;
  updateScore();
  dir = "";
  snake = [
    {
      x: 9 * box,
      y: 10 * box,
      dir: "",
    },
  ];
  food = {
    x: Math.floor(Math.random() * 18 + 1) * box,
    y: Math.floor(Math.random() * 18 + 1) * box,
    img: new Image(),
  };
  food.img.src = foodImages[Math.floor(Math.random() * foodImages.length)];
  game = setInterval(drawGame, 200);
}

let snake = [
  {
    x: 9 * box,
    y: 10 * box,
    dir: "",
  },
];

let dir = "";

function direction(event) {
  // Обрабатываем как события клавиатуры, так и события кнопок
  let keyCode = event.keyCode || event.target.dataset.keyCode;
  
  if (keyCode == 37 && dir != "right") dir = "left";   // ArrowLeft
  else if (keyCode == 38 && dir != "down") dir = "up"; // ArrowUp
  else if (keyCode == 39 && dir != "left") dir = "right"; // ArrowRight
  else if (keyCode == 40 && dir != "up") dir = "down"; // ArrowDown
}

document.addEventListener("keydown", direction);

// Обработчики событий для виртуальных кнопок
document.getElementById('up').addEventListener('click', () => direction({ keyCode: 38 }));
document.getElementById('down').addEventListener('click', () => direction({ keyCode: 40 }));
document.getElementById('left').addEventListener('click', () => direction({ keyCode: 37 }));
document.getElementById('right').addEventListener('click', () => direction({ keyCode: 39 }));

function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      gameOver();
    }
  }
}

function drawGame() {
  ctx.drawImage(ground, 0, 0);
  ctx.drawImage(food.img, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.save();

    if (i === 0) {
      ctx.translate(snake[i].x + box / 2, snake[i].y + box / 2);
      if (dir == "left") {
        ctx.rotate(-Math.PI / 2);
      } else if (dir == "right") {
        ctx.rotate(Math.PI / 2);
      } else if (dir == "down") {
        ctx.rotate(Math.PI);
      }
      ctx.drawImage(snakeHead, -box / 2 -3, -box / 2 - 7);
      if (snake.length === 1) {
        ctx.drawImage(snakeGhostTail, -box / 2, -box / 2 + box);
      }
    } else if (i === snake.length - 1) {
      ctx.translate(snake[i].x + box / 2, snake[i].y + box / 2);

      if (snake[i - 1].dir == "left") {
        ctx.rotate(-Math.PI / 2);
      } else if (snake[i - 1].dir == "right") {
        ctx.rotate(Math.PI / 2);
      } else if (snake[i - 1].dir == "down") {
        ctx.rotate(Math.PI);
      }
      ctx.drawImage(snakeTail, -box / 2, -box / 2);
    } else {
      ctx.fillStyle = "#e99469";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.restore();
  }

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    updateScore();
    food = {
      x: Math.floor(Math.random() * 18 + 1) * box,
      y: Math.floor(Math.random() * 18 + 1) * box,
      img: new Image(),
    };
    food.img.src = foodImages[Math.floor(Math.random() * foodImages.length)];
  } else {
    snake.pop();
  }

  if (snakeX < 0 || snakeX > box * 19 || snakeY < 0 || snakeY > box * 19) {
    gameOver();
  }

  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY,
    dir: dir,
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);

  cadrs++;
}

let game = setInterval(drawGame, 200);
