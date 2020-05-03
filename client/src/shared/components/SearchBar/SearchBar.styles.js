import styled from 'styled-components';

export const SearchBarWrapper = styled.div`
display: flex;
flex-direction: row;
margin: 3rem 0 0 0;
justify-content: left;
align-items: center;

& > * {
    z-index: 900;
}

${({theme}) => theme.media.tablet} {
    position: absolute;
    justify-content: center;
    margin: 2rem 0;
}
`

export const TextInput = styled.input`
padding: .5rem 1rem;
margin-right: .5rem;
outline: none;
border: none;
height: 30px;
box-shadow: 1px 3px 4px #d4d4d4;
`