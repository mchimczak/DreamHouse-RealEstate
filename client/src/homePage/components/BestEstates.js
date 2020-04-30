import React, {useContext, useState, useEffect} from 'react';
import styled from 'styled-components';

import {EstatesContext} from '../../estates/context/EstatesContext';
import { useFetch } from '../../shared/customHooks/useFetch';

import Section from '../../shared/components/Section/Section';
import EstateCard from '../../estates/components/EstateCard';
import Loader from '../../shared/components/Loader/Loader';

const EstatesWrapper = styled.div`
display: flex;
overflow-x: scroll;
height: auto;
padding-bottom: 1rem;

& > div {
    &:not(:first-of-type) {
        margin-left: 10px;
    }

    flex-shrink: 0;
    margin: 0;
    max-width: 300px;
}

${({theme}) => theme.media.tablet} {
    & > div {
        max-width: 450px;
    }
}
${({theme}) => theme.media.desktop} {
    grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
    display: grid;
    gap: 2rem;
    height: auto;
    overflow: hidden;
    
    & > div:not(:first-of-type) {
        margin-left: 0;
        max-width: unset;
    }
}
`
const BestEstatesHeader = styled.h4`
text-transform: uppercase;
font-weight: ${({theme}) => theme.font.thin};
`

const BestEstates = () => {
    const {estatesLikes: [, setEstatesLikes]} = useContext(EstatesContext);
    const [bestEstate, setBestEstate] = useState([])

    const {bestThreeEstate, mostLikedEstates} = useFetch('http://localhost:5000/');

    useEffect(() => {
        setBestEstate(bestThreeEstate);
        setEstatesLikes(mostLikedEstates);

        return () => {
            setEstatesLikes([]);
            setBestEstate([]);
        }
    },[mostLikedEstates, bestThreeEstate]);

    return ( 
        <Section>
            <BestEstatesHeader>Top 3 most recommended posts</BestEstatesHeader>
            { bestEstate && mostLikedEstates
                ? ( <EstatesWrapper>
                        { bestEstate.map ( estate => <EstateCard key={estate.id} {...estate} />) }
                    </EstatesWrapper> )
                : <Loader/>
            }
        </Section>
     );
}
 
export default BestEstates;