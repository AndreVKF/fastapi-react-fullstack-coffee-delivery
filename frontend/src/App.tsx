import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/GlobalStyle'

import { Router } from './routers'
import { AuthContextProvider } from './contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'

import ToastProvider from './utils/toast'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <AuthContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthContextProvider>
      <ToastProvider />
    </ThemeProvider>
  )
}

export default App
