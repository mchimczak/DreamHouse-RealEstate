import React from 'react';

import { FooterWrapper, FooterContentWrapper, FooterContentParagraph} from './Footer.styles';

const Footer = React.memo(() => ( 
    <FooterWrapper>
        <FooterContentWrapper>
            <FooterContentParagraph>
                DreamHouse <sup><small>2020</small></sup>
            </FooterContentParagraph>
        </FooterContentWrapper>
    </FooterWrapper>
),[]);
 
export default Footer;