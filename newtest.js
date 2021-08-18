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

class Tuber {
    constructor(imageUrl, x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.alive = true;

        this.image = new Image();
        this.image.src = imageUrl

        this.render = function() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
    }
}

class Obstacles {
    constructor(imageUrl, x, y, width, height) {
        this.x = x;
        this.y = y;
        this.speed = 2;
        this.width = width;
        this.height = height;
        this.alive = true;

        this.image = new Image();
        this.image.src = imageUrl

        this.render = function() {
            ctx.drawImage(this.image, this.x, this.y += this.speed, this.width, this.height)
        }
    }
}

function movementHandler(e) {
    // console.log('movement', e.key);
    switch (e.which) {
        case 87:
            // move hero up
            player.y - 10 >= 0 ? player.y -= 10 : null;
            break;
        case 65:
            player.x - 10 >= 0 ? player.x -= 10 : null;
            // move left
            break;
        case 83:
            player.y + 10 <= 140 ? player.y += 10 : null;
            //move down
            break;
        case 68:
            //move right
            player.x + 10 <= 290 ? player.x += 10 : null;
            break;
    }
}

function addNewObstacle() {
    if (player.alive) {
        let x = Math.floor(Math.random() * game.width) - 40;
        rock = new Obstacles("https://i.ibb.co/Qj4rQjD/rock.png", x, 0, 20, 20);
        rock.render();
    };
    return false;
}

function gameLoop() {
    // clear the canvas
    ctx.clearRect(0, 0, game.width, game.height);
    movementDisplay.textContent = `X: ${player.x}\nY:${player.y}`;

    if (player.alive) {
        rock.render();
        detectHit(player, rock);
    }
    // render hero here
    player.render();
}

function detectHit(p1, p2) {

    let hitTest = (
        p1.y + p1.height > p2.y &&
        p1.y < p2.y + p2.height &&
        p1.x + p1.width > p2.x &&
        p1.x < p2.x + p2.width
    ); // if all are true -> hit
    if (hitTest) {
        player.alive = false;
        player.render();
    } else {
        return false;
    }
}

window.addEventListener('DOMContentLoaded', (e) => {
    player = new Tuber("https://i.ibb.co/YNFvKHc/Vector-illustration-of-a-floating-in-a-river-while-on-an-inner-tube.jpg", 140, 140, 10, 10);
    rock = new Obstacles("https://i.ibb.co/Qj4rQjD/rock.png", 45, 0, 20, 20);
    rock.render();
    console.log('rock:', rock);
    player.render();
    const runGame = setInterval(gameLoop, 120);
    // setinterval at 3000 to add new obstacle
    setInterval(() => {
        addNewObstacle();
    }, 1000);

});

document.addEventListener('keydown', movementHandler);