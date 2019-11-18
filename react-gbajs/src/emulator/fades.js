const fadeOut = (id, nextId, kill) => {
  const e = document.getElementById(id)
  const e2 = document.getElementById(nextId)
  if (!e) {
    return
  }
 
  const removeSelf = () => {
    if (kill) {
      e.parentElement.removeChild(e)
    } else {
      e.setAttribute('class', 'dead')
      e.removeEventListener('webkitTransitionEnd', removeSelf)
      e.removeEventListener('oTransitionEnd', removeSelf)
      e.removeEventListener('transitionend', removeSelf)
    }

    if (e2) {
      e2.setAttribute('class', 'hidden')
      setTimeout(
        () => e2.removeAttribute('class'),
        0
      )
    }
  }

  e.addEventListener('webkitTransitionEnd', removeSelf, false)
  e.addEventListener('oTransitionEnd', removeSelf, false)
  e.addEventListener('transitionend', removeSelf, false)
  e.setAttribute('class', 'hidden')
}

const lcdFade = (context, target, callback) => {
  let i = 0

  const drawInterval = setInterval(() => {
    i++

    const pixelData = context.getImageData(0, 0, 240, 160)
    for (let y = 0; y < 160; ++y) {
      for (let x = 0; x < 240; ++x) {
        const xDiff = Math.abs(x - 120)
        const yDiff = Math.abs(y - 80) * 0.8
        const xFactor = (120 - i - xDiff) / 120
        const yFactor = (
          (80 - i - ((y & 1) * 10) - yDiff + Math.pow(xDiff, 1 / 2)) / 80
        )

        pixelData.data[(x + y * 240) * 4 + 3] *= (
          Math.pow(xFactor, 1 / 3) * Math.pow(yFactor, 1 / 2)
        )
      }
    }
    context.putImageData(pixelData, 0, 0)

    target.clearRect(0, 0, 480, 320)
    if (i > 40) {
      clearInterval(drawInterval)
    } else {
      callback()
    }
  }, 50)
}

export { lcdFade, fadeOut }