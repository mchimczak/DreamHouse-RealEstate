import React from 'react';
import styled from 'styled-components';

import Section from '../../shared/components/Section/Section';

import house from '../../img/house.png';
import eye from '../../img/eye.png';
import location from '../../img/location.png';

const ContentWrapper = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
text-align: center;
justify-content: center;
align-items: center;
gap: 2rem;
margin-bottom: ${({theme}) => theme.size.large};
`
const ContentBox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

& > img {
    width: 64px;
}
`

const Info = () => {
    return (
        <Section>
            <ContentWrapper>
                <ContentBox>
                    <img src={house} alt="icon"/>
                    <p>Nearly 63% of people who visited DreamHouse are planning to buy and/or sell a home in the next 12 months.</p>
                </ContentBox>
                <ContentBox>
                    <img src={eye} alt="icon"/>
                    <p>More than 3 million average monthly unique users visited DreamHouse mobile app and website in 2020.</p>
                </ContentBox>
                <ContentBox>
                    <img src={location} alt="icon" />
                    <p>Over 30k buy/sell offers from across the world.</p>
                </ContentBox>
            </ContentWrapper>
        </Section> 
     );
}
 
export default Info;