import React from 'react';
import styled from 'styled-components';

// import {ReactComponent as IconHouse} from '../../img/icon_house.svg';

const ContentWrapper = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
margin-top: 5rem;
text-align: center;
gap: 2rem;
`
// const IconHouse = styled.svg`
// fill: white;
// `

const Info = () => {
    return ( 
        <ContentWrapper>
            <p>Nearly 63% of people who visited DreamHouse are planning to buy and/or sell a home in the next 12 months.</p>
            {/* <IconHouse /> */}
            <p>More than 3 million average monthly unique users visited DreamHouse mobile apps and websites in 2020.</p>
            <p>Over 30k buy/sell offers across the whole world</p>
        </ContentWrapper>
     );
}
 
export default Info;