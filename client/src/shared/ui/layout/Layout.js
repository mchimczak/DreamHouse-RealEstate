import React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { createMuiTheme, ThemeProvider as MaterialTheme } from '@material-ui/core/styles';

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

const materialTheme = createMuiTheme({
    overrides: {
        MuiTooltip: {
            tooltip: {
              fontSize: '1.2rem',
              color: `${theme.colors.white}`,
              backgroundColor: `${theme.colors.dark}`
            },
            arrow: {
                color: `${theme.colors.dark}`
            }
        },
    },
  });

const Layout = (props) => (
    <ThemeProvider theme={theme}>
        <MaterialTheme theme={materialTheme}>
            <GlobalStyle/>
            {props.children}
        </MaterialTheme>
    </ThemeProvider>
);
 
export default Layout;

Layout.propTypes = {
    children: PropTypes.node.isRequired
};