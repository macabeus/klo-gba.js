import React from 'react'
import ReactDOM from 'react-dom'
import {
  Card,
  Header,
  HeaderTitle,
  ThemeProvider,
} from 'former-kit'
import skin from 'former-kit-skin-pagarme'
import SelectVision from './components/SelectVision'
import Content from './components/Content'
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

        <Card>
          <Content />
        </Card>
      </VisionProvider>
    </ROMProvider>
  </ThemeProvider>,
  document.getElementById('app')
)
