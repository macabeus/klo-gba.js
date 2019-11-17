import './js/util'
import './js/core'
import './js/arm'
import './js/thumb'
import './js/mmu'
import './js/io'
import './js/audio'
import './js/video'
import './js/video/proxy'
import './js/video/software'
import './js/irq'
import './js/keypad'
import './js/sio'
import './js/savedata'
import './js/gpio'
import './js/gba'
import './resources/xhr'
import biosBin from './resources/bios.bin'

const drawEmulator = (buffer) => {
  var gba
  var runCommands = []
  var debug = null

  try {
    gba = new GameBoyAdvance();
    gba.keypad.eatInput = true;

    gba.setLogger(function(level, error) {
      console.log(error);
      gba.pause();
      var screen = document.getElementById('screen');
      if (screen.getAttribute('class') == 'dead') {
        console.log('We appear to have crashed multiple times without reseting.');
        return;
      }
      var crash = document.createElement('img');
      crash.setAttribute('id', 'crash');
      crash.setAttribute('src', 'resources/crash.png');
      screen.parentElement.insertBefore(crash, screen);
      screen.setAttribute('class', 'dead');
    });
  } catch (exception) {
    gba = null;
  }

  var canvas = document.getElementById('screen');
  gba.setCanvas(canvas);

  gba.logLevel = gba.LOG_ERROR;

  gba.setBios(biosBin);

  function fadeOut(id, nextId, kill) {
    var e = document.getElementById(id);
    var e2 = document.getElementById(nextId);
    if (!e) {
      return;
    }
    var removeSelf = function() {
      if (kill) {
        e.parentElement.removeChild(e);
      } else {
        e.setAttribute('class', 'dead');
        e.removeEventListener('webkitTransitionEnd', removeSelf);
        e.removeEventListener('oTransitionEnd', removeSelf);
        e.removeEventListener('transitionend', removeSelf);
      }
      if (e2) {
        e2.setAttribute('class', 'hidden');
        setTimeout(function() {
          e2.removeAttribute('class');
        }, 0);
      }
    }

    e.addEventListener('webkitTransitionEnd', removeSelf, false);
    e.addEventListener('oTransitionEnd', removeSelf, false);
    e.addEventListener('transitionend', removeSelf, false);
    e.setAttribute('class', 'hidden');
  }

  function run(file) {
    gba.loadRomFromFile(file, function(result) {
      if (result) {
        for (var i = 0; i < runCommands.length; ++i) {
          runCommands[i]();
        }
        runCommands = [];
        fadeOut('preload', 'ingame');
        fadeOut('instructions', null, true);
        gba.runStable();
      } else {
        setTimeout(function() {
          load.onclick = function() {
            document.getElementById('loader').click();
          }
        }, 3000);
      }
    });
  }

  function reset() {
    gba.pause();
    gba.reset();
    var crash = document.getElementById('crash');
    if (crash) {
      var context = gba.targetCanvas.getContext('2d');
      context.clearRect(0, 0, 480, 320);
      gba.video.drawCallback();
      crash.parentElement.removeChild(crash);
      var canvas = document.getElementById('screen');
      canvas.removeAttribute('class');
    } else {
      lcdFade(gba.context, gba.targetCanvas.getContext('2d'), gba.video.drawCallback);
    }
    fadeOut('ingame', 'preload');
  }

  function uploadSavedataPending(file) {
    runCommands.push(function() { gba.loadSavedataFromFile(file) });
  }

  function togglePause() {
    if (gba.paused) {
      if (debug && debug.gbaCon) {
        debug.gbaCon.run();
      } else {
        gba.runStable();
      }
    } else {
      if (debug && debug.gbaCon) {
        debug.gbaCon.pause();
      } else {
        gba.pause();
      }
    }
  }

  function screenshot() {
    var canvas = gba.indirectCanvas;
    window.open(canvas.toDataURL('image/png'), 'screenshot');
  }

  function lcdFade(context, target, callback) {
    var i = 0;
    var drawInterval = setInterval(function() {
      i++;
      var pixelData = context.getImageData(0, 0, 240, 160);
      for (var y = 0; y < 160; ++y) {
        for (var x = 0; x < 240; ++x) {
          var xDiff = Math.abs(x - 120);
          var yDiff = Math.abs(y - 80) * 0.8;
          var xFactor = (120 - i - xDiff) / 120;
          var yFactor = (80 - i - ((y & 1) * 10) - yDiff + Math.pow(xDiff, 1 / 2)) / 80;
          pixelData.data[(x + y * 240) * 4 + 3] *= Math.pow(xFactor, 1 / 3) * Math.pow(yFactor, 1 / 2);
        }
      }
      context.putImageData(pixelData, 0, 0);
      target.clearRect(0, 0, 480, 320);
      if (i > 40) {
        clearInterval(drawInterval);
      } else {
        callback();
      }
    }, 50);
  }

  function setVolume(value) {
    gba.audio.masterVolume = Math.pow(2, value) - 1;
  }

  function setPixelated(pixelated) {
    var screen = document.getElementById('screen');
    var context = screen.getContext('2d');
    if (context.webkitImageSmoothingEnabled) {
      context.webkitImageSmoothingEnabled = !pixelated;
    } else if (context.mozImageSmoothingEnabled) {
      context.mozImageSmoothingEnabled = !pixelated;
    } else if (window.navigator.appName != 'Microsoft Internet Explorer') {
        if (pixelated) {
          screen.setAttribute('width', '240');
          screen.setAttribute('height', '160');
        } else {
          screen.setAttribute('width', '480');
          screen.setAttribute('height', '320');
        }
        if (window.navigator.appName == 'Opera') {
        // Ugly hack! Ew!
        if (pixelated) {
          screen.style.marginTop = '0';
          screen.style.marginBottom = '-325px';
        } else {
          delete screen.style;
        }
      }
    }
  }

  function enableDebug() {
    window.onmessage = function(message) {
      if (message.origin != document.domain && (message.origin != 'file://' || document.domain)) {
        console.log('Failed XSS');
        return;
      }
      switch (message.data) {
      case 'connect':
        if (message.source == debug) {
          debug.postMessage('connect', document.domain || '*');
        }
        break;
      case 'connected':
        break;
      case 'disconnect':
        if (message.source == debug) {
          debug = null;
        }
      }
    }
    window.onunload = function() {
      if (debug && debug.postMessage) {
        debug.postMessage('disconnect', document.domain || '*');
      }
    }
    if (!debug || !debug.postMessage) {
      debug = window.open('debugger.html', 'debug');
    } else {
      debug.postMessage('connect', document.domain || '*');
    }
  }

  document.addEventListener('webkitfullscreenchange', function() {
    var canvas = document.getElementById('screen');
    if (document.webkitIsFullScreen) {
      canvas.setAttribute('height', document.body.offsetHeight);
      canvas.setAttribute('width', document.body.offsetHeight / 2 * 3);
      canvas.setAttribute('style', 'margin: 0');
    } else {
      canvas.setAttribute('height', 320);
      canvas.setAttribute('width', 480);
      canvas.removeAttribute('style');
    }
  }, false);

  run(buffer)
}

export default drawEmulator
