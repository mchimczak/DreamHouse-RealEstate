import React from 'react';
import styled from 'styled-components';

import Card from '@material-ui/core/Card';

const StyledCard = styled(Card)`
width: ${({small}) => small ? '300px' : '90%'};
max-width: 600px;
padding: ${({theme}) => theme.size.large};
margin: ${({theme}) => theme.size.xlarge} auto;
z-index: ${({modal}) => modal ? '999' : null};
cursor: default;
`
const StyledHeader = styled.h4`
font-size: ${({theme}) => theme.size.large};
color: ${({theme}) => theme.colors.darkgrey};
font-weight: ${({theme}) => theme.font.thin};
text-overflow: ellipsis;
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
        <StyledCard>
            <StyledHeaderWrapper>
                {props.createdAt ? <StyledCreatedAt>created at {props.createdAt}</StyledCreatedAt> : ''}
                <StyledHeader title={props.title}> {props.title} </StyledHeader>
            </StyledHeaderWrapper>
            {props.children}
        </StyledCard>
     );
}
 
export default CardTemplate;