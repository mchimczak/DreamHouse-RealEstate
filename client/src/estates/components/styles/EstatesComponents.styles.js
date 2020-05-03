import styled, { css } from 'styled-components';
import { CardContent, Divider, CardMedia, CardActions} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';


//ESTATE LIST COMPONENT
export const EstateItemsWrapper = styled.div`
position: relative;
display: grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
gap: 2rem;
padding: 2rem 0 0 0;
justify-content: center;

& > div {
    margin: 0;
}

&:last-child {
    margin: 0 auto ${({theme}) => theme.size.xlarge} auto;
}

${({theme}) => theme.media.tablet} {
    padding: 0;
}
`

export const StyledHeader = styled.h3`
font-weight: 300;
`

//ESTATE CARD COMPONENT
const StyledMediaWrapperStyles = css`
display: grid;
grid-template: ${({images}) => images.length >= 2 ? 'auto / 3fr 1fr;' : '1fr' };
gap: .5rem;
height: 200px;
width: 100%;
overflow: hidden;
margin: 1rem 0;
${({theme}) => theme.media.tablet} {
    height: 300px;
}
`
export const EstateCardMediaWrapper = styled.div`${StyledMediaWrapperStyles}`;

const StyledMediaAsideWrapperStyles = css`
display: ${({images}) => images.length >= 2 ? 'grid' : 'none' };
grid-template: 1fr 1fr 1fr / auto;
gap: .5rem;
`
export const EstateCardMediaAsideWrapper = styled.div`${StyledMediaAsideWrapperStyles}`;

export const CardActionsWrapper = styled.div`
display: grid;
gap: 3px;
`

export const CardActionsBlock = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
gap: .5rem;
align-items: center;
justify-content: center;
`

export const Number = styled.span`
margin-right: 1rem;
`

//ESTATE ITEM DETAILS COMPONENT
export const CardWrapper = styled.div`
&:last-child {
    ${({theme}) => theme.media.tablet} {
        margin: ${({theme}) => theme.size.xlarge} auto;
    }
}
`

export const StyledContentWrapper = styled(CardMedia)`
display: flex;
flex-direction: column;
`

const EstateDetailsMediaWrapper = css`
display: grid;
grid-template: ${({images}) => images.length >= 2 ? '2fr 1fr / auto' : '1fr' };
gap: .5rem;
height: auto;
width: 100%;
margin: 2rem 0;
`
export const StyledMediaWrapper = styled.div`${EstateDetailsMediaWrapper}`;

const EstateDetailsMediaAsideWrapper = css`
display: ${({images}) => images.length >= 2 ? 'grid' : 'none' };
grid-template: auto / 1fr 1fr 1fr;
gap: .5rem;
`
export const StyledMediaAsideWrapper = styled.div`${EstateDetailsMediaAsideWrapper}`

export const CardContentInfoWrapper = styled.div`
display: flex;
flex-direction: column;
gap: ${({theme}) => theme.size.small} ${({theme}) => theme.size.medium};

& > div:first-child {
    grid-column: 1 / 3;
    margin-bottom: 1rem;
}

${({theme}) => theme.media.tablet} {
    display: grid;
    grid-template-columns: auto auto;
}
`

export const StyledCardActions = styled(CardActions)`
flex-wrap: wrap;
`

// MATERIAL UI ELEMENTS
export const materialUIElements = {
    Divider, CardContent, FavoriteIcon, CardActions, CardMedia
};