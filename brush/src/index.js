import React from 'react'
import ReactDOM from 'react-dom'
import {
  Header,
  HeaderLink,
  HeaderTitle,
  ThemeProvider,
} from 'former-kit'
import skin from 'former-kit-skin-pagarme'
import SelectVision from './components/SelectVision'
import Main from './pages/Main'
import ROMProvider from './providers/ROMProvider'
import VisionProvider from './providers/VisionProvider'
import GitHubLogo from '../assets/github-logo.svg'
import Logo from '../assets/Klo-GBA_JS_Logotipo.svg'

ReactDOM.render(
  <ThemeProvider theme={skin}>
    <ROMProvider>
      <VisionProvider>
        <Header>
          <SelectVision />

          <HeaderTitle>
            <Logo style={{ height: '45px' }} />
          </HeaderTitle>

          <HeaderLink
            onClick={() => window.open('https://github.com/macabeus/klo-gba.js')}
          >
            <GitHubLogo style={{ fill: '#214faa', height: '38px', width: '38px' }} />
          </HeaderLink>
        </Header>

        <Main />
      </VisionProvider>
    </ROMProvider>
  </ThemeProvider>,
  document.getElementById('app')
)
