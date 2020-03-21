import React, {useContext, useState} from 'react';
import styled from 'styled-components';

import {EstatesContext} from '../../estates/context/EstatesContext';
import { useFetch } from '../../shared/customHooks/useFetch';

import Section from '../../shared/components/Section/Section'
import EstateCard from '../../estates/components/EstateCard';
import Loader from '../../img/loader.gif';
import { useEffect } from 'react';

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
    const {setEstatesLikes} = useContext(EstatesContext);
    const [bestEstate, setBestEstate] = useState([])

    const {bestThreeEstate, mostLikedEstates} = useFetch('http://localhost:5000/');

    useEffect(() => {
        setBestEstate(bestThreeEstate);
        setEstatesLikes(mostLikedEstates);
    },[mostLikedEstates, bestThreeEstate]);

    return ( 
        <Section>
            <BestEstatesHeader>Top 3 most liked Real Estate offers</BestEstatesHeader>
            { bestEstate && mostLikedEstates
                ? ( <EstatesWrapper>
                        { bestEstate.map ( estate => <EstateCard key={estate.id} {...estate} />) }
                    </EstatesWrapper> )
                : <StyledImg src={Loader} alt="loading..." />
            }
        </Section>
     );
}
 
export default BestEstates;