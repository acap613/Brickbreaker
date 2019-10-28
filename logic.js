//canvas ref
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//ball variables
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
//paddle variables
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2; //starting coord
var paddleDx = 7; //Dx = Delta X, ie the movement along the x coord
var rightPressed; 
var leftPressed;

//=================================================
//-------------FUNCTIONS!!-------------------------
//=================================================

//---------------KEY COMMAND FUNCTIONS---------------
function keyDownHandler(event) {
    if(event.keyCode == 39) {
        rightPressed = true;
    } else if (event.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(event) {
    if(event.keyCode == 39) {
        rightPressed = false;
    }  else if (event.keyCode == 37) {
        leftPressed = false;
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

//-----------------OBJECT FUNCTIONS--------------------
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0 , Math.PI*2);
    ctx.fillStyle = "silver";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    // 4 arguements: x coord, y coord, width, and height (same with the ball above)
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "silver";
    ctx.fill();
    ctx.closePath();
}

//----------------GAME LOOP-----------------------------
function draw() {
    //refresh page for animation effect
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //calling for ball and paddle functions
    drawBall();
    drawPaddle();
    //collision detectors
    if (x + dx > canvas.width -  ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius || 
        ( 
            y + dy > canvas.height - paddleHeight - ballRadius &&
            x + dx > paddleX &&
            x + dx < paddleX + paddleWidth
        ) // above includes collision with paddle
      ) {
        dy = -dy; //change ball direction
    } else if (y + dy > canvas.height) {
        location.reload();
    }
    //key command detectors
    if (rightPressed && (paddleX + paddleWidth) < canvas.width) {
        paddleX += paddleDx; //right key moves paddle coord delta x + (to the right)
    } else if (leftPressed && paddleX > 0) {
        paddleX -= paddleDx //left key moves paddle coord delta x - (to the left)
    }

    //movement variables
    x += dx;
    y += dy; 

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);