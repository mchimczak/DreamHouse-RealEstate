import styled from 'styled-components';

export const SearchBarWrapper = styled.div`
position: relative;
display: flex;
flex-direction: row;
margin: 2rem 0;
justify-content: left;
align-items: center;

& > * {
    z-index: 400;
    height: 40px;
}

${({theme}) => theme.media.tablet} {
    position: absolute;
    justify-content: center;
    margin: 2rem 0;

    & > * {
        z-index: 600;
        height: 30px;
    }
}

`

export const TextInput = styled.input`
padding: .5rem 1rem;
margin-right: .5rem;
outline: none;
border: none;
box-shadow: 1px 3px 4px #d4d4d4;
font-style: italic;
color: #8c8c8c;
width: 100%;
max-width: 400px;
`

export const Results = styled.span`
font-weight: lighter;
font-size: 12px;
color: #8c8c8c;
position: absolute;
bottom: -44px;
margin: 0;
left: 0;

${({theme}) => theme.media.tablet} {
    bottom: initial;
    top: -18px;
}
`