import React from 'react';
import styled from 'styled-components';

import Card from '@material-ui/core/Card';

const StyledCard = styled(Card)`
width: 100%;
max-width: 600px;
padding: ${({theme}) => theme.size.xlarge} ${({theme}) => theme.size.large};
margin: ${({theme}) => theme.size.xlarge} auto;

`
const StyledHeader = styled.h4`
font-size: ${({theme}) => theme.size.large};
color: ${({theme}) => theme.colors.darkgrey};
font-weight: ${({theme}) => theme.font.thin};
overflow-wrap: break-word;
margin: 0;
`

const CardTemplate = (props) => {
    return ( 
        <StyledCard>
            <StyledHeader> {props.title} </StyledHeader>
            {props.children}
        </StyledCard>
     );
}
 
export default CardTemplate;