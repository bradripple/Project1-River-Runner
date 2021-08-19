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
        this.score = 0;
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
        this.speed = 3;
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
let arrRocks = [];

function addNewObstacle() {

    if (player.alive) {
        let x = Math.floor(Math.random() * game.width) - 40;
        rock = new Obstacles("./rock.png", x, 0, 20, 20);
        // rock.render(); 
        arrRocks.push(rock);

    };
    return false;
}


function youLose() {
    if (player.alive === false) {
        let message = document.getElementById('directions');
        message.textContent = "YOU LOSE! Press enter to try again.";
    }
}


function gameLoop() {
    // clear the canvas
    ctx.clearRect(0, 0, game.width, game.height);
    movementDisplay.textContent = `🍺 x ${player.score}`;

    if (player.alive) {
        arrRocks.forEach(element => element.render());
        detectHit(player, arrRocks);
    } else {
        document.addEventListener('keydown', function(event) {
            if (event.which === 13) {
                location.reload();
            }
        })
    }
    // render hero here
    player.render();
}



function detectHit(p1, p2) {
    for (let i = 0; i < p2.length; i++) {
        let hitTest = (
            p1.y + p1.height > p2[i].y &&
            p1.y < p2[i].y + p2[i].height &&
            p1.x + p1.width > p2[i].x &&
            p1.x < p2[i].x + p2[i].width
        ); // if all are true -> hit
        if (hitTest) {
            player.alive = false;
            youLose();
            console.log('We have a hit', youLose());
        }
    }
    return false;
}

window.addEventListener('DOMContentLoaded', (e) => {
    player = new Tuber("./hippo.jpg", 140, 140, 25, 30);
    rock = new Obstacles("./rock.png", 45, 0, 20, 20);
    rock.render();
    console.log('rock:', rock);
    player.render();

    let message = document.getElementById('directions');
    message.textContent = "Press any key to play";

    let newGame = true;
    document.addEventListener('keydown', (e) => {
        if (newGame) {
            message.textContent = "Grab all the beers!"
            newGame = false;
            const runGame = setInterval(gameLoop, 120);
        }
    });
    setInterval(() => {
        addNewObstacle();
    }, 1000);

});

document.addEventListener('keydown', movementHandler);

// https://i.ibb.co/pJnmLBz/Beer.jpg beer image