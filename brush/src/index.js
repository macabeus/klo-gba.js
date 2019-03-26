import React from 'react'
import ReactDOM from 'react-dom'
import {
  Header,
  HeaderTitle,
  ThemeProvider,
} from 'former-kit'
import skin from 'former-kit-skin-pagarme'
import SelectVision from './components/SelectVision'
import Body from './components/Body'
import ROMProvider from './providers/ROMProvider'
import VisionProvider from './providers/VisionProvider'

ReactDOM.render(
  <ThemeProvider theme={skin}>
    <ROMProvider>
      <VisionProvider>
        <Header>
          <SelectVision />

          <HeaderTitle>
            klo-gba.js
          </HeaderTitle>
        </Header>

        <Body />
      </VisionProvider>
    </ROMProvider>
  </ThemeProvider>,
  document.getElementById('app')
)
