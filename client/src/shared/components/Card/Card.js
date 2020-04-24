import React from 'react';
import styled from 'styled-components';

import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

const StyledCard = styled(Card)`
position: ${({fixed}) => fixed ? 'fixed' : 'initial'};
width: ${({small}) => small ? '300px' : '100%'};
max-width: 600px;
padding: ${({theme}) => theme.size.large};
margin: ${({theme}) => theme.size.medium} auto;
z-index: ${({modal}) => modal ? '999' : null};
overflow-y: ${({scroll}) => scroll ? 'scroll !important' : null};
cursor: default;

${({theme}) => theme.media.tablet} {
    margin: ${({theme}) => theme.size.xlarge} auto 0 auto;
}
`
const StyledHeader = styled.h4`
font-size: ${({theme}) => theme.size.large};
color: ${({theme}) => theme.colors.darkgrey};
font-weight: ${({theme}) => theme.font.thin};
text-overflow: ellipsis;
text-transform: uppercase;
white-space: nowrap;
overflow: hidden;
margin: 0;
`
const StyledHeaderWrapper = styled.div`
margin: 5px 0;
cursor: default;
`
const StyledCreatedAt = styled.p`
margin: 0;
font-weight: ${({theme}) => theme.font.thin};
color: ${({theme}) => theme.colors.darkgrey};
text-align: right;
font-size: 10px;
`

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