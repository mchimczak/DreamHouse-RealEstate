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
margin: 0;
font-weight: 300;
text-align: center;

${({theme}) => theme.media.tablet} {
    margin: 1rem auto;
}
`

//ESTATE CARD COMPONENT
const StyledMediaWrapperStyles = css`
display: grid;
// grid-template: ${({images}) => images.length >= 2 ? 'auto / 3fr 1fr;' : '1fr' };
grid-template: 1fr /1fr };
gap: .5rem;
height: 200px;
width: 100%;
overflow: hidden;
margin: 1rem 0;
// ${({theme}) => theme.media.tablet} {
//     height: 300px;
// }
`
export const EstateCardMediaWrapper = styled.div`${StyledMediaWrapperStyles}`;

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
    margin: 4rem auto;
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
position: relative;
grid-template: ${({images}) => images.length >= 2 ? '2fr 1fr / auto' : '1fr /auto' };
gap: .5rem;
height: ${({images}) => images.length >= 2 ? 'auto' : '300px'};
width: 100%;
margin: 2rem 0;
`
export const StyledMediaWrapper = styled.div`${EstateDetailsMediaWrapper}`;

const EstateDetailsMediaAsideWrapper = css`
display: ${({images}) => images.length >= 1 ? 'grid' : 'none' };
grid-template: 150px / repeat(auto-fit, minmax(30%, 1fr));
gap: .5rem;
`
export const StyledMediaAsideWrapper = styled.div`${EstateDetailsMediaAsideWrapper}`

export const CardContentInfoWrapper = styled.div`
display: flex;
flex-direction: column;

& > div:first-child {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    & > p {
        display: flex;
        flex-direction: column;
    }
}

${({theme}) => theme.media.tablet} {
    display: grid;
    grid-template-columns: auto auto;
    gap: ${({theme}) => theme.size.small} ${({theme}) => theme.size.medium};

    & > div:first-child {
        grid-column: 1 / 3;
    }
}
`

export const ViewGalleryButtonWrapper = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
position: absolute;
right: 0;
`

export const StyledCardActions = styled(CardActions)`
flex-wrap: wrap;
`

// MATERIAL UI ELEMENTS
export const materialUIElements = {
    Divider, CardContent, FavoriteIcon, CardActions, CardMedia
};