import React from 'react'
import ReactDOM from 'react-dom'
import {
  Layout,
  ThemeProvider,
} from 'former-kit'
import skin from 'former-kit-skin-pagarme'
import { GbaProvider } from 'react-gbajs'
import Main from './pages/Main'
import DisplayMapOptionsProvider from './providers/DisplayMapOptionsProvider'
import ROMProvider from './providers/ROMProvider'
import VisionProvider from './providers/VisionProvider'
import KloGbaSidebar from './components/KloGbaSidebar'

ReactDOM.render(
  <ThemeProvider theme={skin}>
    <GbaProvider>
      <ROMProvider>
        <VisionProvider>
          <DisplayMapOptionsProvider>

            <Layout sidebar={<KloGbaSidebar />}>
              <Main />
            </Layout>

          </DisplayMapOptionsProvider>
        </VisionProvider>
      </ROMProvider>
    </GbaProvider>
  </ThemeProvider>,
  document.getElementById('app')
)
