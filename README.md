# <img src="/brush/assets/Klonoa_HatPencil_Logo.svg" align="right" height="75px" />  <img src="/brush/assets/Klo-GBA_JS_Logotipo.svg" height="75px" />

> 🧢 Reverse engineering tool for the Klonoa's GBA game

<p align="center">
  <img src="https://i.imgur.com/QxCoVPh.png">
</p>

**klo-gba.js** is a web Level Editor for *Klonoa: Empire of Dreams* game. Using this tool, you can extend the limits of this awesome game! Please, buy Klonoa's games to support this franchise.

# How does it work?

Do you want to learn how to do reverse engineering? Or more about the front-end side?<br>
Very nice! Let's chat more!

## Posts

Since this is a study project, I'm writing a manual about how I'm developing it, because I want that more people to learn how to do a rom hacking for others games. It's a very fun challenge!
- [🇺🇸 Manual in English](https://medium.com/@bruno.macabeus/reverse-engineering-a-gameboy-advance-game-introduction-ec185bd8e02)
- [🇧🇷 Manual in Portuguese](https://medium.com/@bruno.macabeus/pt-br-engenharia-reversa-num-jogo-de-gameboy-advance-introdu%C3%A7%C3%A3o-21ebffe2f794?source=friends_link&sk=ed05c9b97187694240ed3316ae325165)
- [🇪🇸 Manual in Spanish](https://macabeus.medium.com/ingenier%C3%ADa-inversa-de-un-juego-de-game-boy-advance-gu%C3%ADa-completa-dd5167f70263)

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

klo-gba.js is a monorepo built with three projects: 🖌 `brush` and :scissors: `scissors`. These projects are written using JS, will be compiled by Babel and uses Webpack.

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

3 - We are using Yarn's Workspaces. So at the project's root, you'll should install the dependencies:

```
> yarn
```

4 - So you could build and watch the `scissors` project:

```
> cd klo-gba.js/scissors
> yarn start
```

5 - And finally, at another terminal tab, go to the path `klo-gba.js/brush`, and start the build and watch:

```
> cd klo-gba.js/brush
> yarn start
```

6 - Then the service will start at the URL `http://localhost:8080/`

## How to deploy

1 - Deploy on GitHub Pages is a very easy task. Just run it:

```
> cd klo-gba.js/brush
> yarn run deploy
```

2 - When it finishs, you can see the new website on `http://macalogs.com.br/klo-gba.js/` (or at the respective URL; you can see which is on repository's Settings tab)

# Contribution

The reverse engineering is well explained in [these posts](https://medium.com/@bruno.macabeus/reverse-engineering-a-gameboy-advance-game-introduction-ec185bd8e02?source=friends_link&sk=13ec64916dd886d5d427bdb75a73b847), and the codebase and its architecture are mainly explained on the [seventh chapter](https://macabeus.medium.com/reverse-engineering-a-gameboy-advance-game-lets-paint-our-website-part-7-aafb7813eedc).

## How to add a new vision

Currently, klo-gba.js has only the first visions. If you want to add a new one, you'll need to:

### Create the new vision file

Two files should be created to add a new vision: an info file and the entering gba state on the vision. After creating these two files, you should update [`scissors/src/visions/index.js`](scissors/src/visions/index.js) linking your new files.

#### Entering GBA state

This file is the GBA state when a new vision is being loaded. To get this data, add a `debugger` on [`brush/src/hooks/useGbaSaveRestoreState.js`](brush/src/hooks/useGbaSaveRestoreState.js) before of `setSavedState(saveState())` and run this command on the browser's console when a vision is being loaded:

```
copy(JSON.stringify(saveState()))
```

Then [format the json ](https://jsonlint.com/) and save this data on the [`scissors/src/visions/entering-gba-state`](scissors/src/visions/entering-gba-state) folder.

#### Infos

Create a new file in the folder [`scissors/src/visions/infos`](scissors/src/visions/infos) using as template the file [`template.js`](scissors/src/visions/infos/template.js).

Fill this file following the below instructions:

##### Tilemap

1. Open [no$gba](https://www.nogba.com/) and add a brekpoint on `0805143C`
2. On game, enter on a vision
3. You'll stop on the breakpoint. Firstly the game will unpack the vision's assets, not the tilemap. So you'll need to re-run until find when the game start to unpack the tilemap. To check it, look when there are changes on bytes following of ~`020039CC`. When you see it changes by the first time, remember how much times you needed to re-run (for example, if you needed to re-run 4 times to start to see a change on ~`020039CC`)
4. Leave the vision and enter into it again, and then re-run how much times minus 1 you needed to see changes on `020039CC` (for example, 4 - 1 = 3 times), and get the value at **r0** (for example, on vision 5 is `081B8A28`)
5. You should put this values on `tilemap` without the first 2 digits. For instance: `tilemap: 0x1B8A28`

##### Size

1. Within a vision, add a breakpoint on `0800FF7E` and run the game
2. Go to the address pointed by **r0** and change this byte to `00`. It will be our tile A
3. In the game, you should move Klonoa away from this byte and then return. You'll see that our tile A now is empty
4. Now we should get the tile B (that is bellow A). Set again the breakpoint, and remove how much tiles bellow Klonoa to drop him 1 level
5. Find the tile B looking around him
6. Subtract the address of tile A and tile B. The result is the vision width (on vision 5 is `270`)
7. Now divide the width with the length of the tilemap (you can get it running this application locally and oppeing the vision). The result is the height (on vision 5 is `120`)

##### Objects

1. Go to the previous vision file, and get the address which start the OAM, for example, at the vision 1-3 is `E4DF0`
2. Go to this address at no$gba (in this example, is `080E4DF0`)
3. You'll see that there is many zeros between this section and at the next section, so the address of the next section is the OAM map of the next vision, just get this address at put on the vision file
4. If not work, add a breakpoint on the address `0804505C`, start again the vision, and replace the start address with the value at **r1**.

If some object appears as unknown, you'll need to add this new kind on klo-gba.js, at the file [`objectMaps.js`](scissors/src/objectMaps.js).

##### Portals

1. Add a breakpoint on the address `0800CAF8`
2. Enter on the vision. So the emulator will stop at the breakpoint, and the start address of portals will be stores at **r1**
3. To discover the last address is just guessing: just add 8 on this address until plot a pretty tilemap.

##### Scheme

1. Using no$gba or using klo-gba.js, click on the tile, get its id and use one of the colors name at [`tileNameToColor.js`](brush/src/constants/tileNameToColor.js) file. If this tile is new, add a new color on this file.
