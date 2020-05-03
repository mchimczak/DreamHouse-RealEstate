import React from 'react';
import PropTypes from 'prop-types';

import { StyledCard, StyledHeader, StyledHeaderWrapper, StyledCreatedAt, materialUIElements } from './styles/Card.styles';
const { Divider } = materialUIElements;

const CardTemplate = (props) => {
    return ( 
        <StyledCard modal={props.modal} small={props.small} fixed={props.fixed} scroll={props.scroll}>
            <StyledHeaderWrapper>
                {props.createdAt ? <StyledCreatedAt>created at {props.createdAt}</StyledCreatedAt> : ''}
                <StyledHeader title={props.title}> {props.title} </StyledHeader>
            </StyledHeaderWrapper>
            <Divider light />
            {props.children}
        </StyledCard>
     );
}
 
export default CardTemplate;

CardTemplate.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    modal: PropTypes.string,
    small: PropTypes.string,
    fixed: PropTypes.string,
    scroll: PropTypes.string,
    createdAt: PropTypes.string,
};
