import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const FieldTitle = styled.span`
font-weight: ${({theme}) => theme.font.bold};
text-transform: capitalize;
margin-right: 1rem;
`

export const CardContentInfoWrapper = styled.div`
display: grid;
gap: .5rem;
justify-content: space-between;
grid-template-columns: auto;
align-items: baseline;

& > h6 {
    display: grid;
    grid-template-columns: 70px auto;
    gap: 4rem;
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    & span::first-letter {
        text-transform: uppercase;
    }
}
`

export const FieldContent = styled.span`
white-space: normal;
`

export const materialUIElements = {
    Typography
}