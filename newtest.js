// GLOBAL DOM / VARIABLES
let game = document.getElementById('game');
let pause = false;
let player;
let rock;
let bonk;
bonk = new sound("bonk.mp3");
let gulp;
gulp = new sound("gulp.wav");
const ctx = game.getContext('2d');
let winner;
winner = new sound("winner.mp3");
let background;
background = new sound("background.wav");

ctx.fillStyle = 'white';
// Line Color
ctx.strokeStyle = 'red';
// Line Width
ctx.lineWidth = 5;

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}

class Tuber {
    constructor(imageUrl, x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.score = 0;
        this.alive = true;

        this.image = new Image();
        this.image.src = imageUrl;

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
            player.y + 10 <= 450 ? player.y += 10 : null;
            //move down
            break;
        case 68:
            //move right
            player.x + 10 <= 570 ? player.x += 10 : null;
            break;
    }
}

let arrRocks = [];

function addNewObstacle() {

    if (player.alive) {
        let x = Math.floor(Math.random() * game.width) - 40;
        rock = new Obstacles("images/rock.png", x, 0, 40, 40);
        // rock.render(); 
        arrRocks.push(rock);

    };
    return false;
}

let arrBeers = [];

function addNewBeer() {

    if (player.alive) {
        let x = Math.floor(Math.random() * game.width) - 40;
        beer = new Obstacles("images/beer1.png", x, 0, 25, 35);
        arrBeers.push(beer);

    };
    return false;
}

function youLose() {
    if (player.alive === false) {
        let message = document.getElementById('directions');
        message.style.fontSize = "35px"
        message.textContent = "YOU LOSE! Press enter to try again.";
    }
}

function gameLoop() {
    // clear the canvas
    ctx.clearRect(0, 0, game.width, game.height);
    movementDisplay.textContent = `🍺 x ${player.score}`;
    // movementDisplay.textContent = `X: ${player.x}\nY:${player.y}`;

    if (player.alive && pause === false) {
        background.play();
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
            bonk.play();
            player.alive = false;
            youLose();
            background.stop();
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
            gulp.play();
            player.score += 1;
            p2.splice(i, 1);
            i--;
        } else if (hitTest && player.score === 5) {
            winner.play();
            player.score += 1;
            p2.splice(i, 1);
            let beer = document.getElementById('beer');
            beer.style.visibility = "visible";
            // let hippo = document.getElementById('hippo');
            // hippo.style.visibility = "visible";
            let win = document.getElementById('you-win');
            win.style.visibility = "visible";
            let pour = document.getElementById('beerpour');
            pour.style.visibility = "visible";
            let pour1 = document.getElementById('beerpour1');
            pour1.style.visibility = "visible";
            let tryAgain = document.getElementById('controls');
            tryAgain.style.padding = "40px 0px 0px 0px";
            tryAgain.style.fontSize = "25px";
            tryAgain.textContent = `Press Enter to play again`;
            background.stop();

            pause = true;
            console.log('you win!');
        }
    }
    return false;
}

window.addEventListener('DOMContentLoaded', (e) => {
    player = new Tuber("images/hippo.png", 280, 440, 45, 45);
    rock = new Obstacles("images/rock.png", 45, 0, 25, 25);
    beer = new Obstacles("images/beer1.png", 45, 0, 15, 15);
    // rock.render();
    // player.render();

    let message = document.getElementById('directions');
    // message.textContent = `Press any key to play \n Grab all the beers`;

    let newGame = true;
    document.addEventListener('keydown', (e) => {
        if (newGame) {
            message.style.fontSize = "45px";
            message.textContent = "Grab all the beers!";
            newGame = false;
            const runGame = setInterval(gameLoop, 120);
            setInterval(() => {
                addNewObstacle();
            }, 1000);
            setInterval(() => {
                addNewBeer();
            }, 3000);
        }
    });

});

document.addEventListener('keydown', movementHandler);

// https://i.ibb.co/pJnmLBz/Beer.jpg beer image