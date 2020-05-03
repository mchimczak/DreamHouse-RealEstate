import styled, { css } from 'styled-components';

import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

export const StyledCard = styled(Card)`
position: ${({fixed}) => fixed ? 'fixed' : 'initial'};
width: ${({small}) => small ? '300px' : '100%'};
max-width: 600px;
padding: ${({theme}) => theme.size.large};
margin: ${({theme}) => theme.size.medium} auto;
z-index: ${({modal}) => modal ? '999' : null};
overflow-y: ${({scroll}) => scroll ? 'scroll !important' : null};
cursor: default;

${({theme}) => theme.media.tablet} {
    margin: 0 auto;
}
`

export const StyledHeader = styled.h4`
font-size: ${({theme}) => theme.size.large};
color: ${({theme}) => theme.colors.darkgrey};
font-weight: ${({theme}) => theme.font.thin};
text-overflow: ellipsis;
text-transform: uppercase;
white-space: nowrap;
overflow: hidden;
margin: 0;
`

export const StyledHeaderWrapper = styled.div`
margin: 5px 0;
cursor: default;
`

export const StyledCreatedAt = styled.p`
margin: 0;
font-weight: ${({theme}) => theme.font.thin};
color: ${({theme}) => theme.colors.darkgrey};
text-align: right;
font-size: 10px;
`

export const materialUIElements = {
    Divider
}