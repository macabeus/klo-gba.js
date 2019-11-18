const setVolume = (gba, value) =>
  gba.audio.masterVolume = Math.pow(2, value) - 1

export default setVolume
