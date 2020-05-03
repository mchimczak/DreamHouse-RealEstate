import styled, { css } from 'styled-components';

export const StatusWrapperStyles = css`
display: ${props => props.show ? 'block' : 'none'};
position: fixed;
padding: 1rem 3rem;
background-color: ${({theme}) => theme.colors.darktrans};
color: ${({theme}) => theme.colors.white};
width: 100vw;
left: 0;
right: 0;
bottom: 0;
z-index: 100;
`
export const StatusInfo = styled.p`
margin: 0 auto;
`