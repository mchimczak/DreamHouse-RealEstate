import React from 'react';
import styled from 'styled-components';

import Section from '../../shared/components/Section/Section';
import  { HeroWrapper, HeroImgStyles, ContentWrapperStyles, ContentHeaderStyles, ContentBodyStyles, RectStyles } from './styles/HomePage.styles';

const HeroImg = styled.div`${HeroImgStyles}`;
const ContentWrapper = styled.div`${ContentWrapperStyles}`;
const ContentHeader = styled.p`${ContentHeaderStyles}`;
const ContentBody = styled.p`${ContentBodyStyles}`;
const Rect = styled.div`${RectStyles}`;

const HeroSection = React.memo(() => ( 
    <Section>
        <HeroWrapper>
            <HeroImg/>
            <ContentWrapper>
                <ContentHeader>
                    Welcome to DreamHouse
                </ContentHeader>
                <ContentBody>The biggest real estate agency in Poland.</ContentBody>
                <ContentBody>- Buying and selling an estate has never been easier before -</ContentBody>
            </ContentWrapper>
            <Rect/>
        </HeroWrapper>
    </Section>
),[]);
 
export default HeroSection;