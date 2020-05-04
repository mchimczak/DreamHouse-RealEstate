import styled, { css } from 'styled-components';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import CloseIcon from '@material-ui/icons/Close';


const StyledFiltersWrapper = css`
display: flex;
flex-direction: row;
flex-wrap: nowrap;
position: fixed;
align-items: center;
top: 0;
left: 0;
height: auto;
width: 100vw;
z-index: 500;
padding: 2rem;
background-color: ${({theme}) => theme.colors.black};
transform: ${({isOpen}) => isOpen ? `translateX(0)` : `translateX(100vw)`} ;
transition: .5s ease-in-out;

${({theme}) => theme.media.tablet} {
    position: relative;
    grid-template-columns: auto auto;
    width: auto;
    padding: 2rem 0;
    top: auto;
    background-color: transparent;
    flex-direction: row;
    justify-content: flex-end;
    transform: translateX(0);
    color: ${({theme}) => theme.colors.black};
    margin-top: 2rem;
}
`
export const FiltersWrapper = styled.div`${StyledFiltersWrapper}`

const StyledParamsWrapperStyles = css`
display: grid;
grid-template-columns: 75vw;
gap: 1rem;
align-items: center;
color: ${({theme}) => theme.colors.white};

${({theme}) => theme.media.tablet} {
    position: relative;
    grid-template-columns: auto auto;
    width: auto;
    flex-direction: row;
    justify-content: flex-end;
    color: ${({theme}) => theme.colors.black};

    & div:nth-of-type(1) {
        margin-right: 2rem;
    }
}
`
export const StyledParamsWrapper = styled.div`${StyledParamsWrapperStyles}`

export const StyledWrapper = styled.div`
display: grid;
grid-template-columns: 60px 1fr;
gap: 1rem;
align-items: center;
min-width: 100px;


${({theme}) => theme.media.tablet} {
    grid-template-columns: auto 1fr;
}
`

export const StyledSelect = styled.select`
border: none;
padding: .5rem 1rem;
outline: none;

${({theme}) => theme.media.desktop} {
    box-shadow: 1px 3px 4px #d4d4d4;
    font-size: 14px;
}
`

const StyledIconWrapper = css`
display: flex;
position: ${({isOpen}) => isOpen ? 'absolute' : 'fixed'};
top: 30px;
right: 0;
max-height: 50px;
align-items: center;
justify-content: center;
padding: .5rem 1rem;
background-color: ${({theme}) => theme.colors.black};
z-index: 501;
border-radius: 3px 0 0 3px;
transform: ${({isOpen}) => isOpen ? null : 'translateX(-100vw)'};

${({theme}) => theme.media.tablet} {
    display: none;
}
`

export const IconWrapper = styled.div`${StyledIconWrapper}`

// MATERIAL UI ELEMENTS
export const materialUIElements = {
    SearchRoundedIcon, CloseIcon
};