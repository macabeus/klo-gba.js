import React from 'react'
import ReactDOM from 'react-dom'
import {
  Header,
  HeaderLink,
  Layout,
  ThemeProvider,
} from 'former-kit'
import skin from 'former-kit-skin-pagarme'
import SelectVision from './components/SelectVision'
import Main from './pages/Main'
import ROMProvider from './providers/ROMProvider'
import VisionProvider from './providers/VisionProvider'
import GitHubLogo from '../assets/github-logo.svg'
import KloGbaSidebar from './components/KloGbaSidebar'

ReactDOM.render(
  <ThemeProvider theme={skin}>
    <ROMProvider>
      <VisionProvider>

        <Layout sidebar={<KloGbaSidebar />}>
          <Header>
            <SelectVision />

            <HeaderLink
              onClick={() => window.open('https://github.com/macabeus/klo-gba.js')}
            >
              <GitHubLogo style={{ fill: '#214faa', height: '38px', width: '38px' }} />
            </HeaderLink>
          </Header>
          <Main />
        </Layout>

      </VisionProvider>
    </ROMProvider>
  </ThemeProvider>,
  document.getElementById('app')
)
