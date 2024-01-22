import { createGlobalStyle } from 'styled-components'

import { textM } from './themes/typography'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: content-box;
  }

  :root {
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :focus {
    outline: 0;
  }

  body {
    background: ${(props) => props.theme['--background']};
  }

  body, button input, textarea {
    ${textM}
    color: ${(props) => props.theme['--base-text']};
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active{
    -webkit-box-shadow: 0 0 0 30px ${(props) =>
      props.theme['--base-input']} inset !important;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme['--base-text']};
  }

`
