import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
position: absolute;
bottom: 0;
left: 0;
right: 0;
height: 75px;
width: 100vw;
background-color: ${({theme}) => theme.colors.black};
color: ${({theme}) => theme.colors.white};
padding: ${({theme}) => theme.size.large} ${({theme}) => theme.size.medium};

& > p {
    margin: 0;
}
`

const Footer = () => {
    return ( 
        <FooterWrapper>
            <p>DreamHouse <sup><small>2020</small></sup> </p>
        </FooterWrapper>
     );
}
 
export default Footer;