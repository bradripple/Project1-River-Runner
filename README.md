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

## Language
* JavaScript
* HTML 5
* CSS
## Styling
I used a multi-layered text shadow effect on the title to give it the look of a neon sign.


```text-shadow: 0 0 7px #fff, 0 0 10px #0fa, 0 0 21px #0fa, 0 0 42px #0fa, 0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;```

![](https://i.ibb.co/FKZjzzW/title-screen-shot.png)


I also used box-shadow and a groove style border with a .5 opacity to give dimension to the game board elements

```#left-side {
    grid-area: left-side;
    background-color: rgba(240, 128, 128, .6);
    border-radius: 8px;
    border: rgba(192, 192, 192, .5) groove 3px;
    box-shadow: 5px 10px rgba(192, 192, 192, .4);
    min-width: 150px;
    max-width: 150px;
}
```

![](https://imgur.com/D1d8JkI)

