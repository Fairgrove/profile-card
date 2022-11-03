const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const canvas = document.getElementById("background");
canvas.width = WIDTH;
canvas.height = HEIGHT;

const ctx = canvas.getContext("2d");   
ctx.fillStyle = 'rgba(33, 33, 36, 1)';
ctx.fillRect(0,0, WIDTH, HEIGHT);
//ctx.filter = 'blur(2px)';  

function background(){
    ctx.fillStyle = 'rgba(33, 33, 36, 1)';
    ctx.fillRect(-WIDTH/2, -HEIGHT/2, WIDTH, HEIGHT);
}

function setup(){
    background();
    ctx.translate(WIDTH/2, HEIGHT/2);
    // corners are:
    // -WIDTH/2, -HEIGHT/2
    // -WIDTH/2, HEIGHT/2
    // WIDTH/2, -HEIGHT/2
    // WIDTH/2, HEIGHT/2

    window.requestAnimationFrame(draw);
}

var x = getRandomArbitrary(-10, 10);
var y = getRandomArbitrary(-10, 10);
var z = getRandomArbitrary(-10, 10);

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
        zStack.shift();

        xStack.push(x);
        yStack.push(y);
        zStack.push(z);
    } else {
        xStack.push(x);
        yStack.push(y);
        zStack.push(z);
    }

    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText(Number(xStack[xStack.length - 1]).toFixed(2), -WIDTH/2 + 20, HEIGHT/2);
    ctx.fillText(Number(yStack[yStack.length - 1]).toFixed(2), -WIDTH/2 + 120, HEIGHT/2);
    ctx.fillText(Number(zStack[zStack.length - 1]).toFixed(2), -WIDTH/2 + 220, HEIGHT/2);

    ctx.beginPath();
    ctx.strokeStyle = "White"


    // x and y extremes are +-15 -- scale their values to width and height of screen
    for (let i = 0; i < xStack.length; i++) {    
        ctx.lineTo(xStack[i]*(WIDTH/2)/20, yStack[i]*(HEIGHT/2)/20);
    }
    ctx.stroke();
    
    window.requestAnimationFrame(draw);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

setup();