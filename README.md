# 🦛 Thristy Hippo 🦛

You're a thirsty 🦛 Hippo on a river rampage to drink your fill of beer 🍺.

I pulled inspiration from 80's style driving games and modified it to be a flowing river

## How to play

* Click the link! --> https://bradripple.github.io/Project1-River-Runner/ to play
* Or, fork and clone this repository and then open the index.html file in a browser

## Instructions
Movement
* 'A' - left
* 'S' - down
* 'D' - right
* 'W' - up
* Any key to start
* 'Enter' to try again


Navigate the thisrty Hippo down the river in search of beers. The rocks will bonk you on the head knocking you out, so be sure to avoid them while collecting all the beers till you have had your fill. There is also river grass which may be hiding a rock or beer, so be careful when swimming through. And be sure to avoid other grumpy hippos on the river, they tend to get angry if you step on their toes.

Collect a full 6 pack to win. If you get bonked by a rock you lose.

## Languages
* JavaScript
* HTML 5
* CSS
## Styling
I used a multi-layered text shadow effect on the title to give it the look of a neon sign.


```css
text-shadow: 0 0 7px #fff, 0 0 10px #0fa, 0 0 21px #0fa, 0 0 42px #0fa, 0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;
```

![](https://i.ibb.co/FKZjzzW/title-screen-shot.png)


I also used box-shadow and a groove style border with opacity to give dimension to the game board elements

```css
#left-side {
    grid-area: left-side;
    background-color: rgba(240, 128, 128, .6);
    border-radius: 8px;
    border: rgba(192, 192, 192, .5) groove 3px;
    box-shadow: 5px 10px rgba(192, 192, 192, .4);
    min-width: 150px;
    max-width: 150px;
}
```

## Functionality

I created seperate functions for when you win or lose.
```javascript
function youLose() {
    if (player.alive === false) {
        let message = document.getElementById('directions');
        message.style.fontSize = "35px"
        message.textContent = "YOU LOSE! Press enter to try again.";
    }
}
```
The youWin function changes the visibility of different elements so they display when you win
```javascript
function youWin() {
    if (player.score >= 5) {
        winner.play();
        let beer = document.getElementById('beer');
        beer.style.visibility = "visible";
        let hippo = document.getElementById('hippo');
        hippo.style.visibility = "visible";
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
    }
}
```
![](https://i.ibb.co/sWsVjS0/Screen-Shot-2021-08-23-at-10-31-01-AM.png)

To add sound I created this sound function, and established the different sounds as variables. Then I just had to use .play() to get the sounds to play where I needed 

```javascript
let bonk;
bonk = new sound("bonk.mp3");
let gulp;
gulp = new sound("gulp.wav");
const ctx = game.getContext('2d');
let winner;
winner = new sound("winner.mp3");
let background;
background = new sound("background.wav");
let grunt;
grunt = new sound("hippogrunt.wav");
let grass;
grass = new sound("grass.mp3");

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
```

