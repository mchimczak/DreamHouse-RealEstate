import React, {useContext} from 'react';
import styled from 'styled-components';
import {EstatesContext} from '../../estates/context/EstatesContext';

import EstateCard from '../../estates/components/EstateCard';

const EstatesWrapper = styled.div`
display: flex;
overflow-x: scroll;
height: 440px;
margin-bottom: 5rem;


& > div {
    flex-shrink: 0;
    margin: 0;
    margin-left: 10px;
}
& div:first-of-type {
    margin-left: -20px;
}

`

const BestEstates = () => {
    const {estatesData, estatesLikes} = useContext(EstatesContext);
    let bestThreeEstates = []

    const mostLikedEstates = estatesLikes.sort( (a, b) => {
        return b.likes.length - a.likes.length
    }).slice(0, 3);

    estatesData.map( estate => {
        mostLikedEstates.forEach( (obj, index) => {
            if(estate.id === obj.estateId) {
                return bestThreeEstates.splice(index, 0, estate)
            }
        })
    });

    console.log(bestThreeEstates);

    return ( 
        <div>
            <h4>Top 3 Real Estate</h4>
            <EstatesWrapper>
                { bestThreeEstates.map ( estate => <EstateCard key={estate.id} {...estate} />)
                }
            </EstatesWrapper>
        </div>
     );
}
 
export default BestEstates;