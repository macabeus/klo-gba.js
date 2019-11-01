# <img src="/brush/assets/Klonoa_HatPencil_Logo.svg" align="right" height="75px" />  <img src="/brush/assets/Klo-GBA_JS_Logotipo.svg" height="75px" />

> 🧢 Reverse engineering tool for the Klonoa's GBA game

<p align="center">
  <img src="https://i.imgur.com/kyvAkk6.png">
</p>

**klo-gba.js** is a web Level Editor for *Klonoa: Empire of Dreams* game. Using this tool, you can extend the limits of this awesome game! Please, buy Klonoa's games to support this franchise.

# How does it work?

Do you want to learn how to do reverse engineering? Or more about the front-end side?<br>
Very nice! Let's chat more!

## Posts

Since this is a study project, I'm writing a manual about how I'm developing it, because I want that more people to learn how to do a rom hacking for others games. It's a very fun challenge!
- [🇺🇸 Manual in English](https://medium.com/@bruno.macabeus/reverse-engineering-a-gameboy-advance-game-introduction-ec185bd8e02?source=friends_link&sk=13ec64916dd886d5d427bdb75a73b847)
- [🇧🇷 Manual in Portuguese](https://medium.com/@bruno.macabeus/pt-br-engenharia-reversa-num-jogo-de-gameboy-advance-introdu%C3%A7%C3%A3o-21ebffe2f794?source=friends_link&sk=ed05c9b97187694240ed3316ae325165)

## Talks

Are you the type that prefers to watch instead of read?  No problem!  My friend and I gave a lecture at two conferences about this project.  Of course, in a talk the content is much more condensed, because we have less time, so these posts are much more detailed - but these talks bring a far more interactive approach to unraveling the challenges of reverse engineering.

Talk at **The Conf**, in Brazil 🇧🇷<br>
Since this conference has a general audience, half of this talk is about reverse engineering, and the other half is about the front-end. [Slides](https://speakerdeck.com/ythecombinator/the-day-i-reverse-engineered-a-gameboy-advance-game)

<a href="http://bit.ly/theconf-gba"><img src="http://img.youtube.com/vi/X88pmwSltAY/0.jpg" /></a>

Talk at **BalCCon**, in Serbia 🇷🇸<br>
Since this conference is geared towards security, this talk is focused on the reverse engineering process. [Slides](https://speakerdeck.com/ythecombinator/the-day-i-reverse-engineered-a-gameboy-advance-game-revisited)

<a href="http://bit.ly/balccon-gba"><img src="http://img.youtube.com/vi/xh0V1jRVnQI/0.jpg" /></a>

> Are you liked this project and these talks? I have one about **compilers**! [Do you want to see?](https://github.com/macabeus/macro-compiler)

## Architecture of this project

klo-gba.js is a monorepo built with two projects: `🖌 brush` and `✂️ scissors`. Both projects are written using JS, will be compiled by Babel and uses Webpack.

### Brush

It is responsible to provide a web interface for the user to upload the ROM of Klonoa's game and to view/edit the levels.

This project uses the React component library [Former-Kit](https://github.com/pagarme/former-kit) and it uses Scissors as a dependencie.

### Scissors

It is reponsible to provide informations about each level. To do it so Scissors extracts the informations from a buffer of the ROM and also has some hardcoded informations about each level.

# How to run

1 - Clone this repo:

```
> git clone https://github.com/macabeus/klo-gba.js.git
```

2 - At the project root, compile some webassembly. To run this command, you'll need to have docker installed in your machine, in case you don't, check [Docker official website](https://docs.docker.com/install/):

```
> cd klo-gba.js
> bash ./shellscript/compile-webassembly.sh
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

## How to deploy

1 - Deploy on GitHub Pages is a very easy task. Just run it:

```
> cd klo-gba.js/brush
> npm run deploy
```

2 - When it finishs, you can see the new website on `http://macalogs.com.br/klo-gba.js/` (or at the respective URL; you can see which is on repository's Settings tab)
