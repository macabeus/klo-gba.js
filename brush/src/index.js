import React from 'react'
import ReactDOM from 'react-dom'
import {
  Card,
  Header,
  HeaderTitle,
  ThemeProvider,
} from 'former-kit'
import skin from 'former-kit-skin-pagarme'
import Map from './components/map'
import SelectVision from './components/SelectVision'
import VisionProvider from './providers/VisionProvider'

ReactDOM.render(
  <ThemeProvider theme={skin}>
    <VisionProvider>
      <Header>
        <SelectVision />

        <HeaderTitle>
          klo-gba.js
        </HeaderTitle>
      </Header>

      <Card>
        <Map />
      </Card>
    </VisionProvider>
  </ThemeProvider>,
  document.getElementById('app')
)
