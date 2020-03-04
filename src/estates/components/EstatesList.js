import React from 'react';
import styled from 'styled-components';

import EstateCard from './EstateCard';

const EstateItemsWrapper = styled.div`
position: relative;
display: grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
gap: 2rem;
justify-content: center;

& > div {
    height: auto;
}
${({theme}) => theme.media.tablet} {
    // grid-template: auto / 1fr 1fr;
}
${({theme}) => theme.media.desktop} {
    // display: flex;
    // flex-direction: row;
    align-items: center;
    flex-wrap: wrap;

    & > div {
        align-self: stretch;
        margin: 2rem auto;
    }
}
`

const EstatesList = (props) => {
    return ( 
        <>
        <EstateItemsWrapper>
            {props.items.map( item =>
                <EstateCard 
                key={item.id} 
                    {...item}
                />
            )}
        </EstateItemsWrapper>
        </>
     );
}
 
export default EstatesList;