import React, {useContext, useState, useEffect} from 'react';
import styled from 'styled-components';

import {EstatesContext} from '../../estates/context/EstatesContext';
import { useFetch } from '../../shared/customHooks/useFetch';

import Section from '../../shared/components/Section/Section';
import EstateCard from '../../estates/components/EstateCard';
import Loader from '../../shared/components/Loader/Loader';
import { EstatesWrapperStyles, BestEstatesHeaderStyles } from './styles/HomePage.styles';

const EstatesWrapper = styled.div`${EstatesWrapperStyles}`;
const BestEstatesHeader = styled.h4`${BestEstatesHeaderStyles}`;

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