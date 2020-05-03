import React from 'react';
import PropTypes from 'prop-types';

import { FieldTitle, FieldContent, CardContentInfoWrapper, materialUIElements } from './styles/CardFields.styles';
const { Typography } = materialUIElements;

const CardFields = (props) => {
    return ( <>
        { Object.entries(props.data).map(([title, value]) => (
            <CardContentInfoWrapper key={title}>
                <Typography variant="h6">
                    <FieldTitle>{title}:</FieldTitle> 
                    <FieldContent title={value}> 
                    { value ? value : '- - -' } 
                    { value && title in props.defaultUnits ? `${props.defaultUnits[title]}` : null }
                    </FieldContent>
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
        price: ',00 $',
        area: ' m2'
    }
}