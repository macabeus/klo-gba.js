import { lcdFade, fadeOut } from './fades'

const reset = gba => {
  gba.pause()
  gba.reset()

  const crash = document.getElementById('crash')

  if (crash) {
    const context = gba.targetCanvas.getContext('2d')
    context.clearRect(0, 0, 480, 320)
    gba.video.drawCallback()
    crash.parentElement.removeChild(crash)

    var canvas = document.getElementById('screen')
    canvas.removeAttribute('class')
  } else {
    lcdFade(
      gba.context,
      gba.targetCanvas.getContext('2d'),
      gba.video.drawCallback
    )
  }
  fadeOut('ingame', 'preload');
}

export default reset
