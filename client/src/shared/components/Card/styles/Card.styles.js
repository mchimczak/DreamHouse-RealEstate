import styled from 'styled-components';

import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';

export const StyledCard = styled(Card)`
position: ${({fixed}) => fixed ? 'fixed' : 'initial'};
width: ${({small}) => small ? '300px' : '100%'};
max-width: 600px;
max-height: ${({scroll}) => scroll ? '90vh' : null};
padding: ${({theme}) => theme.size.large};
margin: ${({theme, margin}) => margin ? `${margin}` : `${theme.size.medium} auto`};
z-index: ${({modal}) => modal ? '999' : null};
overflow-y: ${({scroll}) => scroll ? 'scroll !important' : null};
cursor: default;

&::-webkit-scrollbar {
    display: none;
}

${({theme}) => theme.media.tablet} {
    margin: ${({margin}) => margin ? `${margin}` : `0 auto`};
    overflow-y: ${({scroll}) => scroll ? 'auto !important' : null};
}
`

export const StyledHeader = styled.h4`
font-size: ${({theme}) => theme.size.large};
color: ${({theme}) => theme.colors.darkgrey};
font-weight: ${({theme}) => theme.font.thin};
text-overflow: ellipsis;
text-transform: uppercase;
white-space: ${({wrap}) => wrap ? 'wrap' : 'nowrap' };
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

export const CloseBtn = styled.div`
position: absolute;
right: ${({theme}) => theme.size.large};
top: ${({theme}) => theme.size.large};
color: ${({theme}) => theme.colors.darkgrey};
`

export const materialUIElements = {
    Divider, CloseIcon
}