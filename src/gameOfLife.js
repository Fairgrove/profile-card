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
    ctx.fillRect(0,0, WIDTH, HEIGHT);
}

const cellSize = 5;
const cols = Math.floor(WIDTH/cellSize);
const rows = Math.floor(HEIGHT/cellSize);

var grid = new Array(cols);

for (var i = 0; i < grid.length; i++) {
    grid[i] = new Array(rows);
}

for (let ii = 0; ii < cols; ii++) {
    for (let jj = 0; jj < rows; jj++) {
        grid[ii][jj] = Math.floor(Math.random()*2);
    }
}

var next = grid; // for swap


function setup(){
    background();
    window.requestAnimationFrame(draw);
    
}

function draw() {
    background();
    
    ctx.fillStyle = "#7f7f8a";
    // ctx.fillRect(0,0,20,20);
    for (let ii = 0; ii < cols; ii++) {
        for (let jj = 0; jj < rows; jj++) {
            if (grid[ii][jj]){
                ctx.fillRect(ii*cellSize, jj*cellSize, cellSize, cellSize);
                
                // rules for living cells
                if (neighborSum(ii,jj) == 2 || neighborSum(ii,jj) == 3){
                    next[ii][jj] = 1;
                } else {
                    next[ii][jj] = 0;
                }
            }
            else {
                // rules for dead cells
                if (neighborSum(ii,jj) == 3){
                    next[ii][jj] = 1;
                } else {
                    next[ii][jj] = 0;
                }
            }
        }
    }

    swapGrid(); 

    window.requestAnimationFrame(draw);
}

function neighborSum(x, y){
    var sum = 0;

    for (let ii = -1; ii < 2; ii++) {
        for (let jj = -1; jj < 2; jj++) {

            var row = (x+ii+rows) % rows
            var col = (y+jj+cols) % cols

            sum += grid[row][col]
        }
    }

    // subtract the given cell from the sum
    return sum - grid[x][y]
}

function swapGrid(){
    var temp = grid;
    grid = next;
    next = temp;
}

setup();