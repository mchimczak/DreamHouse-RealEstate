import React from 'react';
import styled from 'styled-components';

import Hero from '../../img/hero.jpg';

const HeroWrapper = styled.div`
position: relative;
display: flex;
justify-content: center;
align-items: center;
height: 400px;
`
const HeroImg = styled.div`
position: absolute;
display: flex;
justify-content: center;
align-items: center;
height: 400px;
width: 100vw;
background-image: url(${Hero});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
filter: brightness(0.6);
z-index: 30;
`
const ContentWrapper = styled.div`
position: relative;
margin: 0 auto;
grid-template-columns: 1fr;
grid-template-rows: repeat(3, 30px);
row-gap: 2rem;
width: 100%;
text-align: center;
padding: ${({theme}) => theme.size.large} ${({theme}) => theme.size.xlarge};
z-index: 100;
`
const Content = styled.p`
margin: 0 auto;
color: ${({theme}) => theme.colors.lightgrey};
`
const ContentHeader = styled(Content)`
font-size: ${({theme}) => theme.size.xlarge};
margin: ${({theme}) => theme.size.large} 0;
`
const ContentBody = styled(Content)`
font-size: ${({theme}) => theme.size.large};
font-weight: ${({theme}) => theme.font.thin};
`
const Rect = styled.div`
position: absolute;
bottom: -15px;
width: 30px;
height: 30px;
transform: rotate(45deg);
background-color: ${({theme}) => theme.colors.white};
z-index: 100;

`

const HeroSection = () => ( 
    <HeroWrapper>
        <HeroImg/>
        <ContentWrapper>
            <ContentHeader>
                Welcome to DreamHouse
            </ContentHeader>
            <ContentBody>The biggest real estate agency in Poland.</ContentBody>
            <ContentBody>- Buying and selling your property has never been easier before -</ContentBody>
        </ContentWrapper>
        <Rect/>
    </HeroWrapper>
);
 
export default HeroSection;