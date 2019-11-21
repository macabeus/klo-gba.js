import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import sha1 from 'js-sha1'
import { parse, stringify } from 'flatted/esm';
import drawEmulator from '../emulator'
import reset from '../emulator/reset'
import setVolume from '../emulator/setVolume'

const ReactGbaJs = ({ romBufferMemory, volume, foo }) => {
  const [gba, setGba] = useState(null)

  useEffect(() => {
    if (gba !== null) {
      reset(gba)
    }

    const newGbaInstance = drawEmulator(romBufferMemory)
    setGba(newGbaInstance)
  }, [sha1(romBufferMemory)])

  useEffect(() => {
    if (gba === null) {
      return
    }

    setVolume(gba, volume)
  }, [gba, volume]);

  (() => {
    if (gba === null) {
      return
    }

    if (foo === 2) {
      let temp = undefined
      debugger

      if (temp !== undefined) {
        console.log('temp', temp)
        debugger
        Serializer.deserializePNG(temp, (result) => {
          debugger
          gba.defrost(result)
        })
      }

      // console.log('--- run async ===');
  
      // const a = parse(localStorage.getItem('gbacpu'))
  
      // const gbaold = {
      //   ...a,
      //   io: {
      //     registers: (new Uint8Array(a.io)).buffer,
      //   },
      //   mmu: {
      //     ram: (new Uint8Array(a.mmu.ram)).buffer,
      //     iram: (new Uint8Array(a.mmu.iram)).buffer,
      //   }
      // }

      // debugger

      // gba.defrost(gbaold)
  



      // (async () => {
      //   const freezed = gba.freeze()
  
      //   const io = await freezed.io.registers.arrayBuffer();
      //   const ram = await freezed.mmu.ram.arrayBuffer();
      //   const iram = await freezed.mmu.iram.arrayBuffer();
  
      //   const gbat = stringify({
      //     ...freezed,
      //     io: registers { [...new Uint8Array(io)] },
      //     mmu: {
      //       ram: [...new Uint8Array(ram)],
      //       iram: [...new Uint8Array(iram)],
      //     }
      //   })
      //   const gbap = parse(gbat)
  
      //   debugger
      // })();
  
      // debugger
    }  
  })();

  return (
    <canvas id="screen" width="480" height="320" />
  )
}

ReactGbaJs.propTypes = {
  romBufferMemory: PropTypes.object.isRequired,
  volume: PropTypes.number.isRequired,
}

export default ReactGbaJs
