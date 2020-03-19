import React, {useContext, useMemo} from 'react';
import styled from 'styled-components';
import {EstatesContext} from '../../estates/context/EstatesContext';

import Section from '../../shared/components/Section/Section'
import EstateCard from '../../estates/components/EstateCard';
import Loader from '../../img/loader.gif';

const EstatesWrapper = styled.div`
display: flex;
overflow-x: scroll;
height: auto;
padding-bottom: 1rem;

& > div {
    flex-shrink: 0;
    margin: 0;
    margin-left: 10px;
}
& > div:first-of-type {
    margin-left: -20px;
}

${({theme}) => theme.media.tablet} {
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
    gap: 2rem;
    height: auto;
    overflow: hidden;

    & > div {
        margin: 0;
    }
    & > div:first-of-type {
        margin-left: 0px;
    }
}
`
const BestEstatesHeader = styled.h4`
text-transform: uppercase;
`
const StyledImg = styled.img`
display: flex;
margin: 4rem auto;
`

const BestEstates = () => {
    const {estatesData, estatesLikes} = useContext(EstatesContext);
    let bestThreeEstates = [];
    let mostLikedEstates;

    if(estatesLikes) {
        mostLikedEstates = estatesLikes.sort( (a, b) => {
            return b.likes.length - a.likes.length
        }).slice(0, 3);
    }

    estatesData && estatesData.map( estate => {
        return mostLikedEstates.forEach( (obj, index) => {
            if(estate.id === obj.estateId) {
                return bestThreeEstates.splice(index, 0, estate)
            }
        })
    });

    console.log(bestThreeEstates);

    return ( 
        <Section>
            <BestEstatesHeader>Top 3 Real Estate</BestEstatesHeader>
            { bestThreeEstates.length > 1
                ? (<EstatesWrapper>
                    { bestThreeEstates.map ( estate => <EstateCard key={estate.id} {...estate} />)
                    }
                </EstatesWrapper> )
                : <StyledImg src={Loader} alt="loading..." />
            }
        </Section>
     );
}
 
export default BestEstates;