import "@fontsource/montserrat";
import { createGlobalStyle } from "styled-components";
import 'typeface-poppins';

const GlobalStyle = createGlobalStyle`
    :root {
    --colorPrimary: #ff0336;
    --colorSecondary: #0d1216;
    --bgSecondary: #40576d12;
    --gray: #eef2f3;
    --grayish: #4b5563;
    --red: #d70000;
    --redSecondary: #E94560;
    --white: #ffffff;
    --gainsboro: #dddddd;
    --backDe: #000000de;
    --black3b: #0000003b;
    --black99: #00000099;
    --fontPrimary: 'Poppins', Arial, Helvetica, sans-serif;
    }
    
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-color: #f2f2f280;
        color: #646464;
        font-family: var(--fontPrimary);
    }
`;

export default GlobalStyle;