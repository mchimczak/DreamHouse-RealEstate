import styled, { css } from 'styled-components';

export const PageWrapper = styled.ul`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
padding: 2rem;
`
export const PageBox = styled.li`
display: flex;
align-items: center;
justify-content: center;
padding: 1rem 2rem;
border: 1px solid ${({active}) => active ? '#333' : '#d6d6d6'};
width: 40px;
height: 40px;
background-color: ${({active}) => active ? '#333' : null};
color: ${({active}) => active ? '#f9f9f9' : null};
cursor: pointer;
transition: .2s ease-in;
transform: ${({active}) => active ? 'scale(1.1)' : null};
margin: ${({active}) => active ? '0 1rem' : null};

&:hover {
    background-color: ${({active}) => active ? null : '#565656'};
    color: ${({theme}) => theme.colors.white};
    border ${({active}) => active ? null : '#565656'};
    transform: ${({active}) => active ? null : 'scale(1.02)' };
    margin: ${({active}) => active ? null : '0 .5rem'};
}
`

export const NextPrevBox = styled(PageBox)`
border: none;
padding: 1rem;
width: 30px;
height: 30px;
margin: 0 1rem;

&:hover {
    transform: none;
    margin: 0 1rem;
    background-color: initial;
    color: initial;
}
`