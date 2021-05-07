const cvs = document.getElementById("snakebasak");
const ctx = cvs.getContext("2d");

// unit in px (so need apple of 32 px too)
const box = 32;

// adding the image inside the box (apple and the box's images)

const ground = new Image();
ground.src = "2.jpg";

const foodImg = new Image();
foodImg.src = "3.png";

// adding audios

//declaring them
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

//linking them
dead.src = "dead.mp3";
eat.src = "eat.mp3";
up.src = "move.mp3";
right.src = "move.mp3";
left.src = "move.mp3";
down.src = "move.mp3";

let snake = [];

snake[0] = {
    x : 5 * box,
    y : 7 * box
};

// food for the snake (apple in this case, can add anything using 32 px image)
// this food gonna come 'randomly' after eating at any position 

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// declaring the score variable

let score = 0;

//code to control the snake

//which key to work, how to respond to which keys

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// checking for the collision with the wall 

function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// drawing things on canva
//snake color, moves, border etc..

function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // initital head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // moving in directions responding to keys
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // when snake gonna eat the food (apple in this case)
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game overconditions
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

let game = setInterval(draw,100);