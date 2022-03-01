import { createGlobalStyle } from "styled-components";
import { darkThemeProps, lightThemeProps } from "./theme.styles";

export const GlobalStyle = createGlobalStyle`
  :root {
    ${props => props.theme ? darkThemeProps : lightThemeProps}

    @media (prefers-color-scheme: dark) {
        ${props => props.theme ? lightThemeProps : darkThemeProps}
    }
  }

  body {
    margin: 0;
    background: var(--background);
  }
`