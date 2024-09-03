
let foodX, foodY;
let snakeX = 10, snakeY = 20;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let gameover = false;
let setIntervalid;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;

const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highscoreElement = document.querySelector(".high-score");
highscoreElement.innerText = `High-score: ${highScore}`;


const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalid);
    alert("game over");
    location.reload();
}

const initGame = () => {
    if (gameover) return handleGameOver();
    let htmlMarkUp = `<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`
    if (foodX == snakeX && foodY == snakeY) {

        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score",highScore);
        scoreElement.innerText = `score: ${score}`;
        highscoreElement.innerText = `High-score: ${highScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameover = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkUp += `<div class="head" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
        if (i !== 0 && snakeBody[0][1] == snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameover = true;
        }
    }
    htmlMarkUp += `<div class="head" style="grid-area:${snakeY} / ${snakeX}"></div>`
    playBoard.innerHTML = htmlMarkUp;
}

const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

changeFoodPosition();
setIntervalid = setInterval(() => {
    initGame();
}, 125);
document.addEventListener("keydown", changeDirection)