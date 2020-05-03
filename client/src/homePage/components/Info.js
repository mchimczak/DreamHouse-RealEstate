import React from 'react';
import styled from 'styled-components';

import Section from '../../shared/components/Section/Section';
import { InfoContentBox, InfoContentWrapperStyles} from './styles/HomePage.styles';

import house from '../../img/house.png';
import eye from '../../img/eye.png';
import location from '../../img/location.png';

const ContentWrapper = styled.div`${InfoContentWrapperStyles}`;

const Info = React.memo(() => {
    return (
        <Section>
            <ContentWrapper>
                <InfoContentBox>
                    <img src={house} alt="icon"/>
                    <p>Nearly 63% of people who visited DreamHouse are planning to buy and/or sell a home in the next 12 months.</p>
                </InfoContentBox>
                <InfoContentBox>
                    <img src={eye} alt="icon"/>
                    <p>More than 3 million average monthly unique users visited DreamHouse mobile app and website in 2020.</p>
                </InfoContentBox>
                <InfoContentBox>
                    <img src={location} alt="icon" />
                    <p>Over 30k buy/sell offers from across the world.</p>
                </InfoContentBox>
            </ContentWrapper>
        </Section> 
     );
},[]);
 
export default Info;