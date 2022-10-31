const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight+10;

const canvas = document.getElementById("background");
canvas.width = WIDTH;
canvas.height = HEIGHT;

const ctx = canvas.getContext("2d");   
ctx.fillStyle = 'rgba(33, 33, 36, 1)';
ctx.fillRect(0,0, WIDTH, HEIGHT);
  
function background(){
    ctx.fillStyle = 'rgba(33, 33, 36, 1)';
    ctx.fillRect(-WIDTH/2, -HEIGHT/2, WIDTH, HEIGHT);
}

function setup(){
    background();
    ctx.translate(WIDTH/2, HEIGHT/2);
    window.requestAnimationFrame(draw);
}
-WIDTH/2, -HEIGHT/2, WIDTH, HEIGHT
var x = getRandomArbitrary(-10.0, 10.0);
var y = getRandomArbitrary(-10.0, 10.0);
var z = getRandomArbitrary(-10.0, 10.0);

const sigma = 10;
const rho = 28;
const beta = 8/3;

const dt = 0.01;

var xStack = [];
let yStack = [];
let zStack = [];

function draw() {
    background();

    dx = (sigma * (y - x)) * dt
    x = x + dx

    dy = (x * (rho - z) - y) * dt
    y = y + dy

    dz = (x * y - beta - z) * dt
    z = z + dz

    if (xStack.length >= 333) {
        xStack.shift();
        yStack.shift();

        xStack.push(x);
        yStack.push(y);
    } else {
        xStack.push(x);
        yStack.push(y);
    }

    ctx.beginPath();
    ctx.strokeStyle = "White"

    for (let i = 0; i < xStack.length; i++) {    
        ctx.lineTo(xStack[i]*40, yStack[i]*8);
    }
    ctx.stroke();

    // ctx.font = "30px Arial";
    // ctx.fillText(xStack.length, -200, -200);
    
    window.requestAnimationFrame(draw);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

setup();