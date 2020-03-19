import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import EstateCard from './EstateCard';
import Loader from '../../shared/components/Loader/Loader'

const EstateItemsWrapper = styled.div`
position: relative;
display: grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
column-gap: 2rem;
justify-content: center;
`

const EstatesList = (props) => {
    return (
        <EstateItemsWrapper>
            {props.items.map( item =>
                <EstateCard 
                key={item.id} 
                    {...item}
                />
            )}
        </EstateItemsWrapper>
     );
}
 
export default EstatesList;

EstatesList.propTypes = {
    items: PropTypes.array.isRequired
}