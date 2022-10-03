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
    line-height: 1.4;
    letter-spacing: 1px;
    margin: 0;
    padding: 0;
  }

a {
    text-decoration: none;

    &:focus,
    &:hover {
      text-decoration: underline;
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

h2 {
  font-size: inherit;
  margin-top: 0;
}

p {
  max-width: 60ch;
}
`;
