import styled, { css } from 'styled-components';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import CloseIcon from '@material-ui/icons/Close';
import {StyledButton} from '../Button/Button.styles';

export const SearchBarWrapper = styled.div`
position: fixed;
display: flex;
flex-direction: column;
justify-content: left;
align-items: center;
transform: ${({isOpen}) => isOpen ? 'translateX(0)' : 'translateX(-100%)'};
top: 0;
left: 0;
height: auto;
min-height: 150px;
width: 100vw;
z-index: 400;
padding: 2rem;
background-color: ${({theme}) => theme.colors.black};
transition: .5s ease-in-out;

& > * {
    z-index: 400;
    height: 40px;
}

& > button {
    width: 75%;
    margin-top: .5rem;
}

${({theme}) => theme.media.tablet} {
    position: relative;
    flex-direction: row;
    background-color: transparent;
    justify-content: center;
    width: auto;
    min-height: unset;
    transform: translateX(0);

    & > * {
        z-index: 600;
        height: 30px;
    }
    & > button {
        width: calc(20% - .5rem);
        margin-top: 0;
    }
}

`

export const TextInput = styled.input`
padding: .5rem 1rem;
margin-top: 2rem;
outline: none;
border: none;
border-radius: 0;
text-align: center;
font-style: italic;
color: ${({disabled}) => disabled ? '#333' : '#8c8c8c'};
width: 75%;
max-width: 400px;
background-color: ${({disabled}) => disabled ? '#d6d6d6' : null};

${({theme}) => theme.media.tablet} { 
    margin-top: 0;
    width: 250px;
    text-align: left;
    margin-right: .5rem;
    // box-shadow: ${({disabled}) => disabled ? 'none' : '1px 3px 4px #d4d4d4'};
}
`

export const Results = styled.span`
font-weight: lighter;
font-size: 12px;
color: #8c8c8c;
position: absolute;
top: 2rem;
margin: 0;

${({theme}) => theme.media.tablet} {
    bottom: initial;
    top: -18px;
    left: 0;
}
`

export const StyleButton = styled(StyledButton)`
display: ${({disabled}) => disabled ? 'none' : null};
`

const StyledIconWrapper = css`
height: 50px;
align-items: center;
justify-content: center;
padding: .5rem 1rem;
right: 0;
z-index: 501;
border-radius: 3px 0 0 3px;
transition: .5s ease-in;

${({theme}) => theme.media.tablet} {
    display: none;
}
`

export const OpenIconWrapper = styled.div`
${StyledIconWrapper}
display: ${({isOpen}) => isOpen ? 'none' : 'flex'};
background-color: ${({theme}) => theme.colors.orange};
position: fixed;
padding-right: 5rem;
bottom: 0;
left: 15px;
z-index: 95;
width: max-content;
`

export const CloseIconWrapper = styled.div`
${StyledIconWrapper}
position: absolute;
display: flex;
background-color: ${({theme}) => theme.colors.black};
top: 50%;
transform: translateY(-50%);
`

// MATERIAL UI ELEMENTS
export const materialUIElements = {
    SearchRoundedIcon, CloseIcon
};