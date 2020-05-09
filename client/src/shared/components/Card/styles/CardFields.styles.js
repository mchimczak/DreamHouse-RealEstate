import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const FieldTitle = styled.span`
font-weight: ${({theme}) => theme.font.bold};
text-transform: capitalize;
margin-right: 1rem;
`

export const CardContentInfoWrapper = styled.div`
display: grid;
margin-top: .5rem;
justify-content: space-between;
grid-template-columns: auto;
align-items: baseline;

& > p {
    display: grid;
    grid-template-columns: 70px auto;
    gap: 2rem;
    font-size: 12px;

    & span::first-letter {
        text-transform: uppercase;
    }
}
`

export const FieldContent = styled.span`
white-space: ${({nowrap}) => nowrap ? 'nowrap' : 'normal' };
overflow: ${({nowrap}) => nowrap ? 'hidden' : null };
overflow-wrap: ${({nowrap}) => nowrap ? 'break-word' : 'break-word' };
text-overflow: ${({nowrap}) => nowrap ? 'ellipsis' : null };

`

export const materialUIElements = {
    Typography
}