import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*,
::before,
::after {
    box-sizing: border-box;
}

:root {
}

body {
    color: hsl(0deg 0% 0%);
    font-family: Arial, Open-Sans, Helvetica, Sans-Serif;
    font-size: 13px;
    letter-spacing: 1px;
    margin: 0;
    padding: 0;
  }

a {
    color: hsl(0deg 0% 0%);
    text-decoration: none;

    &:hover {
        font-weight: bold;
    }
}

img {
  display: block;
  max-width: 100%;
}

h1 {
  font-size: inherit;
margin-top: 0;
}

p {
  max-width: 60ch;
}
`;
