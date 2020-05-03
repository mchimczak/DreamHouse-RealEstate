import styled from 'styled-components';
import { Card, CardMedia, CardActions } from '@material-ui/core';

export const UserListWrapper = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
gap: 2rem;
margin: 3rem 0;
`

export const CardActionsWrapper = styled.div`
display: grid;
padding: 1rem;
`

export const CardWrapper = styled.div`
grid-row: 1;
${({theme}) => theme.media.tablet} {
    grid-column: 2;
}
`

export const StyledCard = styled(Card)`
position: sticky;
top: 50px;
width: 100%;
max-width: 400px;
height: auto;
margin: ${({theme}) => theme.size.xlarge} auto;

${({theme}) => theme.media.desktop} {
    margin: 0 auto;
}
`

export const StyledContentWrapper = styled(CardMedia)`
display: flex;
flex-direction: column;
`

export const StyledCardActions = styled(CardActions)`
flex-wrap: wrap;
`

export const EstatesContainer = styled.div`
${({theme}) => theme.media.tablet} {
    margin: 3rem 0;
}
`

export const UserProfileWrapper = styled.div`
display: grid;
grid-template-columns: auto;
gap: 2rem;

${({theme}) => theme.media.desktop} {
    grid-template-columns: 4fr 1fr;
    margin: 3rem 0;
}
`