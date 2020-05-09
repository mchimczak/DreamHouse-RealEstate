import React from 'react';
import PropTypes from 'prop-types';

import { StyledCard, CloseBtn, StyledHeader, StyledHeaderWrapper, StyledCreatedAt, materialUIElements } from './styles/Card.styles';
const { Divider, CloseIcon } = materialUIElements;

const CardTemplate = (props) => {
    return ( 
        <StyledCard modal={props.modal} small={props.small} fixed={props.fixed} scroll={props.scroll}>
            {
                props.close && 
                <CloseBtn onClick={props.close}>
                    <CloseIcon style={{ fontSize: 20, zIndex: 999 }} />
                </CloseBtn>
            }
            <StyledHeaderWrapper>
                {props.createdAt ? <StyledCreatedAt>created at {props.createdAt}</StyledCreatedAt> : ''}
                <StyledHeader title={props.title} wrap={props.wrap}> {props.title} </StyledHeader>
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
    close: PropTypes.func
};
