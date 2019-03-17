# klo-gba.js

> 🧢 Reverse engineering tool for the Klonoa's GBA game

<p align="center">
  <img src="https://i.imgur.com/fYrkkzL.png">
</p>

**klo-gba.js** is a web Level Editor for *Klonoa: Empire of Dreams* game. Using this tool, you can extend the limits of this awesome game! Please, buy Klonoa's games to support this franchise.

Since this is a study project, I'm writing a manual about how I'm developing it, because I want that more people to learn how to do a rom hacking for others games. It's a very fun challenge!
- [🇺🇸 Manual in English](https://gbatemp.net/threads/tutorial-reverse-engineering-step-by-step-in-klonoa-game.532112/)
- [🇧🇷 Manual in Portuguese](http://openkorebrasil.org/index.php?/topic/5345-engenharia-reversa-no-gameboy-advance)

> **This project is still in developing** and is just a hobby project that a fan is writing.<br>
> Then some features is lacking. In this moment, you can just see the informations about the level, but unfortunately can't edit it. But coming soon you will can create your own Kaizo levels!

## How to run

1 - Clone this repo:

```
> git clone https://github.com/macabeus/klo-gba.js.git
```

2 - At the project root, compile some webassembly. To run this command, you'll need to have docker installed in your machine, in case you don't, check [Docker official website](https://docs.docker.com/install/):

```
> cd klo-gba.js
> sh ./shellscript/compile-webassembly.sh
```

3 - At the path `klo-gba.js/scissors`, install the dependencies and start Scissors project:

```
> cd klo-gba.js/scissors
> npm i
> npm start
```

4 - At another terminal tab, go to the path `klo-gba.js/brush`, install the dependencies and start Brush project:

```
> cd klo-gba.js/brush
> npm i
> npm start
```

5 - Then the service will start at the URL `http://localhost:8080/`

## Architecture of this project

klo-gba.js is a monorepo built with two projects: `🖌 brush` and `✂️ scissors`. Both projects are written using JS, will be compiled by Babel and uses Webpack.

### Brush

It is responsible to provide a web interface for the user to upload the ROM of Klonoa's game and to view/edit the levels.

This project uses the React component library [Former-Kit](https://github.com/pagarme/former-kit) and it uses Scissors as a dependencie.

### Scissors

It is reponsible to provide informations about each level. To do it so Scissors extracts the informations from a buffer of the ROM and also has some hardcoded informations about each level.
