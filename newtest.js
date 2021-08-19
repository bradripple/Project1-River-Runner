// GLOBAL DOM / VARIABLES
let game = document.getElementById('game');
let pause = false;
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
        case 38:
            // move hero up
            player.y - 10 >= 0 ? player.y -= 10 : null;
            break;
        case 37:
            player.x - 10 >= 0 ? player.x -= 10 : null;
            // move left
            break;
        case 40:
            player.y + 10 <= 140 ? player.y += 10 : null;
            //move down
            break;
        case 39:
            //move right
            player.x + 10 <= 290 ? player.x += 10 : null;
            break;
    }
}
let arrRocks = [];

function addNewObstacle() {

    if (player.alive) {
        let x = Math.floor(Math.random() * game.width) - 40;
        rock = new Obstacles("./img/rock.png", x, 0, 20, 20);
        // rock.render(); 
        arrRocks.push(rock);

    };
    return false;
}

let arrBeers = [];

function addNewBeer() {

    if (player.alive) {
        let x = Math.floor(Math.random() * game.width) - 40;
        beer = new Obstacles("./img/beer1.png", x, 0, 15, 15);
        arrBeers.push(beer);

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

    if (player.alive && pause === false) {
        arrRocks.forEach(element => element.render());
        arrBeers.forEach(element => element.render());
        beerCollect(player, arrBeers);
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

function beerCollect(p1, p2) {
    for (let i = 0; i < p2.length; i++) {
        let hitTest = (
            p1.y + p1.height > p2[i].y &&
            p1.y < p2[i].y + p2[i].height &&
            p1.x + p1.width > p2[i].x &&
            p1.x < p2[i].x + p2[i].width
        ); // if all are true -> hit
        if (hitTest && player.score < 5) {
            player.score += 1;
            p2.splice(i, 1);
            i--;
        } else if (hitTest && player.score === 5) {
            player.score += 1;
            p2.splice(i, 1);
            let message = document.getElementById('directions');
            message.textContent = "WINNER!";
            pause = true;
            console.log('you win!');
        }
    }
    return false;
}

window.addEventListener('DOMContentLoaded', (e) => {
    player = new Tuber("./img/raft.png", 140, 140, 10, 15);
    rock = new Obstacles("./img/rock.png", 45, 0, 20, 20);
    beer = new Obstacles("./img/beer1.png", 45, 0, 15, 15);
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
    setInterval(() => {
        addNewBeer();
    }, 3000);

});

document.addEventListener('keydown', movementHandler);

// https://i.ibb.co/pJnmLBz/Beer.jpg beer image