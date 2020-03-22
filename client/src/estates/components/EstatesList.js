import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import EstateCard from './EstateCard';

const EstateItemsWrapper = styled.div`
position: relative;
display: grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
column-gap: 2rem;
justify-content: center;
`

const EstatesList = ({items}) => {
    return (
        <EstateItemsWrapper>
            {items.length !== 0 
                ?   (items.map( item =>
                    <EstateCard 
                    key={item.id} 
                        {...item}
                    />
                    ))
                : <p>This user has not published any offer yet.</p>
            }
        </EstateItemsWrapper>
     );
}
 
export default EstatesList;

EstatesList.propTypes = {
    items: PropTypes.array.isRequired
}