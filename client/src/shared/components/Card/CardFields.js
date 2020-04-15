import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';

const FieldTitle = styled.span`
font-weight: ${({theme}) => theme.font.bold};
text-transform: capitalize;
margin-right: 1rem;
`
const CardContentInfoWrapper = styled.div`
display: grid;
gap: .5rem;
justify-content: space-between;
grid-template-columns: auto;
align-items: baseline;

& > h6 {
    display: grid;
    grid-template-columns: 70px auto;
    gap: 1rem;
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    & span::first-letter {
        text-transform: uppercase;
    }
}
`

const CardFields = (props) => {
    return ( <>
        { Object.entries(props.data).map(([title, value]) => (
            <CardContentInfoWrapper key={title}>
                <Typography variant="h6">
                    <FieldTitle>{title}:</FieldTitle> 
                    <span title={value}> 
                    {value ? value : 'no info provided'} 
                    { title in props.defaultUnits ? ` ${props.defaultUnits[title]}` : '' }
                    </span>
                </Typography>
            </CardContentInfoWrapper>
        )) }
    </> );
};
 
export default CardFields;

CardFields.propTypes = {
    data: PropTypes.object.isRequired,
}

CardFields.defaultProps = {
    defaultUnits: {
        price: '$',
        area: 'm2'
    }
}