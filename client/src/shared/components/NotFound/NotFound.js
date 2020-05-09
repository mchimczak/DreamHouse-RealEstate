import React from 'react';
import styled from 'styled-components';
import Sorry from '../../../img/sorry.png';

const SvgWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;

& > img {
    width: 60%;
    height: 50%;
    position: relative;
    object-fit: contain;

    ${({theme}) => theme.media.tablet} {
    height: 300px;
    }
}
`


const NotFound = () => ( 
    <SvgWrapper>
        <img src={Sorry} alt=""/>
    </SvgWrapper>
 );
 
export default NotFound;