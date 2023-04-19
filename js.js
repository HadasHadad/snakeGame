const playBtn = document.getElementById("playBtn");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const scoreField = document.querySelector("h2#score");
const gameOverFeild = document.querySelector("h2#gameOver");
const noWallsBtn = document.querySelector("button#noWalls");

let score = 0
let snakeLinks = [];
let isCollision = false;
let snakeLength = 1;
let headX ;
let headY ;
let moveX;
let moveY ;
let foodX ;
let foodY ;
let eatFood;
let gameOver;
let check = 0;
let increaseSpeed;
let speed ;
let noWallsState = false;

function init() {

    score = 0
    snakeLinks = [];
    isCollision = false;
    snakeLength = 1;
    headX = 0;
    headY = 0;
    moveX = 0;
    moveY = 0;
    foodX = Math.ceil((Math.random() * 490) / 10) * 10;
    foodY = Math.ceil((Math.random() * 490) / 10) * 10;
    eatFood = false;
    gameOver = false;
    check = 0;
    increaseSpeed = 0;
    speed = 100;
    gameOverFeild.innerHTML = "";
}

playBtn.addEventListener("click", drawBoard);
document.addEventListener("keydown", () => { keyPressed(event) });
noWallsBtn.addEventListener("click", noWallsInit );

function drawBoard() {
    init();
    canvas.style.display = "block";
    noWallsBtn.className = "hide";
    document.querySelector("div.hide").style.display = "block";
    scoreField.innerHTML = `Score: ${score}`;
    playBtn.innerHTML = "restart";
    gameStart();





}
function noWallsInit(){
    noWallsState = true;
    drawBoard();
}

function gameStart() {

    moveSnake();
    drawSnake();
    drawFood();
    checkCollision();
    if (!gameOver) {
        if (increaseSpeed == 10) {
            if (speed != 20) {
                speed -= 20;
                increaseSpeed = 0;
            }

        }
        window, setTimeout(gameStart, speed);
    }
    else {
        canvas.style.display = "none";
        gameOverFeild.innerHTML = `GAME OVER`;
        noWallsBtn.className ="";

    }



}



function drawSnake() {
    ctx.clearRect(0, 0, 500, 500);
    ctx.fillStyle = "green";
    console.log(snakeLinks.length);
    for (let i = 0; i < snakeLinks.length; i++) {
        ctx.fillRect(snakeLinks[i].x, snakeLinks[i].y, 10, 10);
    }

}

function moveSnake() {
    snakeLinks.unshift({ x: headX, y: headY });
    headX += moveX;
    headY += moveY;


    while (snakeLinks.length > snakeLength) {
        snakeLinks.pop();
    }

}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, 10, 10);
    if (eatFood) {
        foodX = Math.ceil((Math.random() * 490) / 10) * 10;
        foodY = Math.ceil((Math.random() * 490) / 10) * 10;
        eatFood = false;
        increaseSpeed++;
        score += 10;
        scoreField.innerHTML = `Score: ${score}`;

    }


}

function checkCollision() {
    if (headX == foodX && headY == foodY) {
        snakeLength++;
        eatFood = true;
    }
    if ((headX < 0 || headX > 500) || (headY < 0 || headY > 500)) {
        if (noWallsState){
            noWalls();
        }
        else{
        console.log("wall")
        gameOver = true;
        }
    }
    for (let i = 1; i < snakeLinks.length; i++) {
        if (headX == snakeLinks[i].x && headY == snakeLinks[i].y) {
            console.log("tail");
            gameOver = true;
        }
    }

}
function keyPressed(event) {
    switch (event.key) {
        case "ArrowDown":
            console.log("down");
            moveX = 0;
            moveY = 10;
            break;
        case "ArrowLeft":
            console.log("left");
            moveX = -10;
            moveY = 0;
            break;
        case "ArrowRight":
            console.log("right");
            moveX = 10;
            moveY = 0;
            break;
        case "ArrowUp":
            console.log("up");
            moveX = 0;
            moveY = -10;
            break;
        default:
            break;
    }
}

function noWalls() {

    if (headX < 0) {
        headX = 500;
    }
    if (headX > 500) {
        headX = 0;
    }
    if (headY < 0) {
        headY = 500;
    }
    if (headY > 500) {
        headY = 0;
    }
}