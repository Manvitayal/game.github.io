const canvas = document.getElementById('game');
var ctx = canvas.getContext("2d");

class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;


let xVelocity = 0;
let yVelocity = 0;


function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }
    clearScreen();
    
    checkAppleCollision();
    drawApple();
    drawSnake();
    setTimeout(drawGame, 1000/ speed);

}

function isGameOver(){
    let gameOver = false;

    if(yVelocity ==0 && xVelocity == 0){
        return false;
    }

    if(headX < 0 ){
        gameOver = true;
    }
    else if(headX > tileCount){
        gameOver = true
    }
    else if(headY < 0){
        gameOver = true
    }
    else if(headY > tileCount){
        gameOver = true
    }

    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }

    if(gameOver){
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over!", canvas.width / 7, canvas.height / 2)
    }
    return gameOver;

}

function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

drawGame();

function drawSnake(){

    ctx.fillStyle = 'orange';
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize,tileSize)
    }

    snakeParts.push(new SnakePart(headX, headY));
    if(snakeParts.length > tailLength){
        snakeParts.shift();
    }

    ctx.fillStyle = 'green'
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;

}

function drawApple(){
    
    ctx.beginPath();
    ctx.arc(appleX * tileCount, appleX * tileCount, 10, 0, 5 * Math.PI);
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
}

function checkAppleCollision(){
    if(appleX === headX && appleX == headY){
        appleX = Math.floor(Math.random()* tileCount);
        appleX = Math.floor(Math.random()* tileCount);
        tailLength++;
    }
}
document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    //up
    if(event.keyCode ==38){
        if(yVelocity ==1)
            return
        yVelocity = -1;
        xVelocity = 0;
    }

    //down
    if(event.keyCode ==40){
        if(yVelocity ==-1)
            return
        yVelocity = 1;
        xVelocity = 0;
    }

    //left
    if(event.keyCode ==37){
        if(xVelocity ==1)
            return
        yVelocity = 0;
        xVelocity = -1;
    }

    //right
    if(event.keyCode ==39){
        if(xVelocity ==-1)
            return
        yVelocity = 0;
        xVelocity = 1;
    }
}

document.getElementById('button').addEventListener('click', loadText);

function loadText(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'text.txt', true);
    xhr.onload = function(){
        
            document.getElementById('instructions').innerHTML = this.responseText;
        

    }
    xhr.send();
}