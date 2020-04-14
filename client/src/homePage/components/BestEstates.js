import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
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

${({theme}) => theme.media.tablet} {
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
    gap: 2rem;
    height: auto;
    overflow: hidden;

    & > div {
        margin: 0;
    }
}
`
const BestEstatesHeader = styled.h4`
text-transform: uppercase;
font-weight: ${({theme}) => theme.font.thin};
`
const StyledImg = styled.img`
display: flex;
margin: 4rem auto;
`

const BestEstates = () => {
    const {estatesLikes: [, setEstatesLikes]} = useContext(EstatesContext);
    const [bestEstate, setBestEstate] = useState([])

    const {bestThreeEstate, mostLikedEstates} = useFetch('http://localhost:5000/');

    useEffect(() => {
        setBestEstate(bestThreeEstate);
        setEstatesLikes(mostLikedEstates);
    },[mostLikedEstates, bestThreeEstate]);

    return ( 
        <Section>
            <BestEstatesHeader>Top 3 most recommended Real Estate offers</BestEstatesHeader>
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

BestEstates.propTypes = {
    bestThreeEstate: PropTypes.array,
    mostLikedEstates: PropTypes.array,
}