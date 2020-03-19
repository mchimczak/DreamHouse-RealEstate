import React from 'react';
import styled from 'styled-components';
import Loader from '../../../img/loader.gif';

const StyledImg = styled.img`
display: flex;
margin: 4rem auto;
`

const LoaderGif = () => {
    return ( 
        <StyledImg src={Loader} alt="loader" />
     );
}
 
export default LoaderGif;