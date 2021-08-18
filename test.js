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
// let x = 0;
// const id = setInterval(() => {
//     ctx.clearRect(0, 0, game.width, game.height);
//     ctx.fillRect(x, 50, size, size);
//     let x += size;

//     if (x >= game.width) {
//         clearInterval(id);
//     }
// }, 200);

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
    constructor(x, y, color, width, height) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = 1;
        this.width = width;
        this.height = height;
        this.alive = true;

        // this.image = new Image();
        // this.image.src = imageUrl;

        this.render = function() {
            // ctx.drawImage(pic2, this.x += this.speed, this.y, this.width, this.height)
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y += this.speed, this.width, this.height);
            console.log('this.y:', this.y);
        }
    }
}


// this.render = function() {
//     ctx.drawImage(this.image, this.x, this.y += this.speed, this.width, this.height);
// }

// this.animate = function() {
//     ctx.clearRect(0, 0, game.width, game.height);
//     ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
//     this.y++;
//     requestAnimationFrame(animate);

// }
// const rockImage = new Image();
// rockImage.src = "https://i.ibb.co/Qj4rQjD/rock.png";
// let position = 0;


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
            player.y + 10 <= game.height ? player.y += 10 : null;
            //move down
            break;
        case 68:
            //move right
            player.x + 10 <= game.width ? player.x += 10 : null;
            break;
    }
}

function addNewObstacle() {
    if (player.alive) {
        let x = Math.floor(Math.random() * game.width) - 40;
        rock = new Obstacles(x, 0, 'black', 10, 10);
        rock.render();
    };
    return false;
}

function gameLoop() {
    // clear the canvas
    ctx.clearRect(0, 0, game.width, game.height);
    // movementDisplay.textContent = `X: ${rock.x}\nY:${rock.y}`;

    if (player.alive) {
        // let rock = new Obstacles("https://i.ibb.co/Qj4rQjD/rock.png", 45, 0, 10, 10);
        // let rock = new Obstacles(45, 0, 'black', 10, 10);
        movementDisplay.textContent = `X: ${rock.x}\nY:${rock.y}`;
        rock.render();
        console.log('rock:', rock);
    }
    // render hero here
    player.render();
}

// function animate() {
//     ctx.clearRect(0, 0, game.width, game.height);
//     rock.render();
//     position++;
//     requestAnimationFrame(animate);
// }



window.addEventListener('DOMContentLoaded', (e) => {
    player = new Tuber("https://i.ibb.co/YNFvKHc/Vector-illustration-of-a-floating-in-a-river-while-on-an-inner-tube.jpg", 140, 140, 10, 10);
    rock = new Obstacles(60, 0, 'black', 10, 10);
    rock.render();
    console.log('rock:', rock);
    player.render();
    const runGame = setInterval(gameLoop, 120);
    // setinterval at 3000 to add new obstacle
    setInterval(() => {
        addNewObstacle();
    }, 3000);

});

document.addEventListener('keydown', movementHandler);