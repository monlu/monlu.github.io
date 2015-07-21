# Frogger
This is a frogger game that I made from scratch using HTML5 canvas.

## Set up
The game is set up by creating a game grid that is composed of 21 x 40 cells, with each cell being a 50x50 pixel square.

I use Javascript prototypes to create objects and render them in game. These objects include, lanes, cars, logs, lilypads, and the frog itself.

Underscore.js is used to create modules that specify certain properties which we extend to the Javascript prototypes.

## Prototypes

The frogs movement is dictated by the up/down/left/right arrows on the keyboard. Everything else has an inherent "speed" that changes its location as the game is rendered every 30ms.

I use the built-in canvas methods to sketch and render each object.

## Goal

The goal of the game is to keep landing on the lilypad at the top of the screen. Once you have reached the end the objects will reset.