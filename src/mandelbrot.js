const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const canvas = document.getElementById("background");
canvas.width = WIDTH;
canvas.height = HEIGHT;

const ctx = canvas.getContext("2d");   
ctx.fillStyle = 'rgba(33, 33, 36, 1)';
ctx.fillRect(0,0, WIDTH, HEIGHT);

function background(){
    ctx.fillStyle = 'rgba(33, 33, 36, 1)';
    ctx.fillRect(0,0, WIDTH, HEIGHT);
}

function setup(){
    background();
    window.requestAnimationFrame(draw);
}

const maxIter = 50;
const escapeRadius = 10.0; // numbers beyond this are considered infinite
const pixelSize = 5;
const cols = Math.floor(WIDTH/pixelSize);
const rows = Math.floor(HEIGHT/pixelSize);

function draw() {
    background();

    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {

            pixel = calcMandle(x, y)
            // decide color of pixel

            color = scale(pixel, 0, maxIter, 0, 255);
            ctx.fillStyle = rgbToHex(33, color, color);
            console.log(rgbToHex(33, 33, color))
            ctx.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
            
        }           
    }
    // window.requestAnimationFrame(draw);
}

function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

function calcMandle(x, y){
    a = scale(x, 0, cols, -3, 1.5);
    b = scale(y, 0, rows, -2, 2);
    
    var ca = a;
    var cb = b;

    var n = 0;
    
    while(n <= maxIter){
        a = (a*a - b*b) + ca;
        b = (2.0*a*b) + cb;

        // console.log(x, y, a+b);
        if (Math.abs(a+b) > escapeRadius){
            return n;
        } 

        n++;
    }

    return n;
}

setup();