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

const cellSize = 20;
var grid = [[],[]]

function setup(){
    //find the amount of squares that fit in the height and width of the screen -- maybe do something where the cell size is dynamic as well, by defining a range which the cell can be of size

    for (let ii = 0; ii < array.length; ii++) {
        for (let jj = 0; jj < array.length; jj++) {
            grid[ii][jj] = Math.random();
        }
    }
    background();
    window.requestAnimationFrame(draw);
}

function draw() {
    background();



    window.requestAnimationFrame(draw);
}

setup();