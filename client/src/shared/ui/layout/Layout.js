import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { theme } from '../../../utils/theme';

const GlobalStyle = createGlobalStyle`
*, *::after, *::before {
    box-sizing: border-box;
}
html {
    font-family: Roboto;
    font-size: 62.5%;
    background-color: ${theme.colors.lightgrey};
}
body {
    margin: 0;
    padding: 0;
    background-color: ${theme.colors.lightgrey};
    color: ${theme.colors.dark};
    font-size: ${theme.size.medium};
    width: 100vw;
    overflow-x: hidden;
}

a {
    color: inherit;
    text-decoration: none;
}

`


const Layout = (props) => (
    <ThemeProvider theme={theme}>
        <>
            <GlobalStyle/>
            {props.children}
        </>
    </ThemeProvider>
);
 
export default Layout;