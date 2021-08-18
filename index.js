// GLOBAL DOM / VARIABLES
let game = document.getElementById('game');
let tubeImg = "https://i.ibb.co/J7z0RcZ/Vector-illustration-of-a-floating-in-a-river-while-on-an-inner-tube.jpg";
let player;
let rock;
let whirlPool;
const ctx = game.getContext('2d');

ctx.fillStyle = 'white';
// Line Color
ctx.strokeStyle = 'red';
// Line Width
ctx.lineWidth = 5;

const image = new Image(60, 45); // Using optional size for image
image.onload = drawImageActualSize; // Draw when image has loaded

// Load an image of intrinsic size 300x227 in CSS pixels
image.src = tubeImg;

function draw() {
    // Use the intrinsic size of image in CSS pixels for the canvas element
    // game.width = this.naturalWidth;
    // game.height = this.naturalHeight;

    // Will draw the image as 300x227, ignoring the custom size of 60x45
    // given in the constructor

    ctx.drawImage(this, 110, 130, 10, 10);

    // To use the custom size we'll have to specify the scale parameters
    // using the element's width and height properties - lets draw one
    // on top in the corner:
    //   ctx.drawImage(this, 0, 0, this.width, this.height);
}
// drawImageActualSize();
// ====================== SETUP FOR CANVAS RENDERING ======================= //
// 2D rendering context for canvas element.
// It is used for drawing shapes, text, images, and other objects.
// Set your Context!

// ====================== ENTITIES ======================= //
// class Tuber {
//     constructor(x, y, color, width, height, image) {
//         this.x = x;
//         this.y = y;
//         this.image = image;
//         this.width = width;
//         this.height = height;
//         this.alive = true;

//         this.render = function() {
//             const img = new Image();
//             img.src = this.image;
//             ctx.drawImage(this.x, this.y, this.width, this.height, this.image);
//             // ctx.fillStyle = this.color;
//             // ctx.fillRect(this.x, this.y, this.width, this.height, this.image);
//         }

//     }
// }

// class Obstacles {
//     constructor(x, y, width, height, speed) {
//         this.x = x;
//         this.y = y;
//         this.width = width;
//         this.height = height;
//         this.speed = speed;

//         this.render = function() {
//             ctx.drawImage(this, this.x, this.y, this.width, this.height, this.speed);
//         }
//     }
// }

// ctx.drawImage = (this.tubeImg, this.x, this.y, this.width, this.height);
// ====================== HELPER FUNCTIONS ======================= //
// SANDBOX FOR TESTING PAINTING TECHNIQUES
// function testPaint(y, x, width, height) {
//     ctx.fillRect(y, x, width, height);
//     ctx.strokeRect(y, x, width, height); // (x coordinate (horizontal), y coordinate (vertical), width, height)
// }
// testPaint(10, 10, 100, 100);

//  GUI
function movementHandler(e) {
    switch (e.which) {
        case 65: // move left
            player.x - 10 >= 0 ? player.x -= 10 : null;
            break;
        case 68: // move right
            player.x + 10 <= game.width ? player.x += 10 : null;
            break;
        case 87: // move up
            player.y - 10 >= 0 ? player.y -= 10 : null;
            break;
        case 83: // move down
            player.y + 10 <= game.height ? player.y += 10 : null;
    }
}
// w - 87 e.which - up
// a - 65 - left
// s - 83 - downsa
// d - 68 - right

//  KEYBOARD INTERACTION LOGIC

// ====================== GAME PROCESSES ======================= //

// ====================== COLLISION DETECTION ======================= //

// ====================== PAINT INTIAL SCREEN ======================= //
window.addEventListener('DOMContentLoaded', (e) => {
    draw();
    // player = new Tuber(40, 40, 10, 10, tubeImg);
    rock = new Obstacles();
    whirlPool = new Obstacles();

    // shrek = new Crawler(100, 200, "#BADA55", 40, 80);
    // shrek.render();

    // const runGame = setInterval(gameLoop, 120);
    // player.render();
    // console.log(player);
});

document.addEventListener('keydown', movementHandler);

// https://i.ibb.co/7XdTbXJ/water-swirl.gif - whirlpool gif
// https://i.ibb.co/Qj4rQjD/rock.png - rock image
// https://i.ibb.co/YNFvKHc/Vector-illustration-of-a-floating-in-a-river-while-on-an-inner-tube.jpg - tuber image