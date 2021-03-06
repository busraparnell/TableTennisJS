var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 15;
var ballY = 50;
var ballSpeedY = 4;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 5;

var showingWinScreen = false;

var paddle1Y = 162.5;
var paddle2Y = 162.5;
const PADDLE_HEIGHT = 75;
const PADDLE_THICKNESS = 10;

function calculateMousePos(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
	
}
function handleMouseClick(evt){
	if (showingWinScreen){
		player1Score = 0;
		player2Score = 0;
		showingWinScreen = false;		
	}
}

window.onload = function(){
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	
	var framesPerSecond = 30;
	setInterval(function(){
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);
	
	canvas.addEventListener('mousemove', 
	function(evt){
		var mousePos = calculateMousePos(evt);
		paddle1Y = mousePos.y -(PADDLE_HEIGHT/2);
	});
	
	canvas.addEventListener('mousedown', handleMouseClick);
}

function ballReset(){
	if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE){
		showingWinScreen = true;
	}
	
	ballSpeedX = -ballSpeedX;
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}

function computerMovement(){
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if(paddle2YCenter < ballY-30){
		paddle2Y += 6;
	}else if (paddle2YCenter > ballY-30){
		paddle2Y -= 6;
	}
}

function moveEverything(){
	if(showingWinScreen){
		return;
	}
	computerMovement()
	
	ballX = ballX + ballSpeedX;
	ballY = ballY + ballSpeedY;
	
	if( ballX > canvas.width){
		if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT){
			ballSpeedX = -ballSpeedX;
			var deltaY = ballY -(paddle2Y + PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;
		}else{
		player1Score++;
		ballReset()
		
		}
	}
	if( ballX < 0){
		if(ballY > paddle1Y && 
		ballY < paddle1Y+PADDLE_HEIGHT){
			ballSpeedX = -ballSpeedX;
			var deltaY = ballY -(paddle1Y + PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;
		}else{
		player2Score++;
		ballReset()
		
		}
	}
	if( ballY > canvas.height ){
		ballSpeedY = -ballSpeedY;
	}
	if( ballY < 0 ){
		ballSpeedY = -ballSpeedY;
	}
}

function colorCircle(centerX, centerY, radius, drawColor){
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	//x i, y si, yari capi baslangic acisi ve kac derecelik aci cizecegi(topun), saat yonunde cizmesi- true saat yonunun tersinde cizmesi false
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
	
}
function drawNet(){
		for( var i = 0; i<canvas.height; i+=20){
			colorRect(canvas.width/2-1, i, 2, 10, 'white');
		}
}

function drawEverything(){
	//blanking out the screen with black
	colorRect(0, 0, canvas.width, canvas.height, 'black');
	
	if(showingWinScreen){
		canvasContext.fillStyle = 'white';
		if (player1Score >= WINNING_SCORE) {
			canvasContext.fillText("Player Won!", 250, 100);
		}else if (player2Score >= WINNING_SCORE){
			canvasContext.fillText("Computer Won!", 250, 100);
		}
		canvasContext.fillText("Click To Play Again", 250, 300);
		
		return;
	}
	
	drawNet();
	
	
	//left player paddle
	colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
	
	//draw the ball
	colorCircle(ballX, ballY, 5, 'white');
	
	//right player paddle
	colorRect(canvas.width-PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
	
	canvasContext.fillText(player1Score, 100, 100);
	canvasContext.fillText(player2Score, canvas.width-100, 100);
}

function colorRect(leftX, topY, width, height,drawColor){
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX,topY,width,height);
	
}

function myTimer() {
  var d = new Date();
  var t = d.toLocaleTimeString();
  document.getElementById("demo").innerHTML = t;
}
setInterval(myTimer, 1000);


//progress bar example
//function start() {
 // var elem = document.getElementById("myBar");   
 // var width = 0;
 // var id = setInterval(frame, 10);
 // function frame() {
 //   if (width == 100) {
 //     clearInterval(id);
 //   } else {
 //     width++; 
 //     elem.style.width = width + '%'; 
 //   }
 // }
//}

