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



// frequency in this case is how many frames pass between spawns


function spawnRandomTriangles(frequency) {
    // this just makes sure I never have a negative 
    if (frequency < 1) {
        frequency = 1;
    } else {
        // this makes sure frequency is integer, MODULO DOES NOT WORK WITH FRACTION 
        frequency = Math.round(frequency);
    }
    // this if statement is MODULO, here it means a new triangle spawns every (frequency) # // of frames 
    if (globalCount % frequency === 0) {

        // this escape thing is to escape my while loop, technically optional
        let escape = 0;

        // creating a new triangle object 
        // Relevant params: the first two are x and y, respectively
        // X is always in the same place, slightly off screen
        // Y is random! That way they don't all spawn on top of each other
        // Math.random() returns a random number between 0 and 1, 
        // 400 is the just under height of my canvas, so multiplying them together gives 
        // a random value between 0 and 400
        // And then I scoot it up by 20 so it's not on the edge  

        const triangle = new Triangle(-25, Math.random() * 400 + 20, '#228B22', 21, 1);

        // this is technically optional, this while loop is trying to prevent triangles
        // from spawning too close to other triangles 

        while (escape < 10) {
            if (findClosest(triangle.x + 11, triangle.y + 9, arrTriangles, 'distance') > 29 || arrTriangles.length === 0) {
                escape = 10;

                // PUSH INTO THE ARRAY THIS IS ESSENTIAL. 
                arrTriangles.push(triangle);
            } else {
                // this is the try again we spawned too close clause 
                triangle.y = Math.random() * 400 + 20;
                escape++;
            }

        }

    }
}
5: 06
    // this calls the render() method for every single object in the array, if you don't call the method
    // for every single object then those objects won't render :D 
arrTriangles.forEach(element => element.render());
New
5: 07

function detectBulletHit(arr) {
    // triangle collision. Right now they have square collision boxes but that's good enough for now.
    // this is making sure the arrays aren't empty
    if (arrProjectiles.length > 0 && arr.length > 0)
    // this is going through each bullet instance in my bullet (projectiles) array
        for (let i = 0; i < arrProjectiles.length; i++) {
        // this is actually going through each triangle in my trianglearray
        // triangle array in this case needs to be the param
        for (let j = 0; j < arr.length; j++) {
            // I'm just checking if the objects exist again
            if (arrProjectiles[i] && arr[j].x) {
                // this is collision detection. I suggests squares for collision, that's the easiest.
                // make sure to draw a square
                // don't try to check exact positions, needs to be a square
                if (arrProjectiles[i].x < arr[j].x + arr[j].length && // makes sure bullet is to left of triangle edge
                    arrProjectiles[i].x > arr[j].x && // makes sure bullet is to right of triangle edge
                    arrProjectiles[i].y > arr[j].y - 18 && // makes sure bullet is below triangle edge
                    arrProjectiles[i].y < arr[j].y + 2 // makes sure bullet is above triangle edge
                ) {
                    // I kill objects by splicing them out.
                    arrProjectiles.splice(i, 1);
                    arr.splice(j, 1);
                    score += 1;
                    money += 5;
                    document.getElementById('score').innerText = 'Score: ' + score;
                    document.getElementById('money').innerText = 'Money: ' + money;
                }
            }
        }
    }
};