import styled from 'styled-components';

export const FooterWrapper = styled.footer`
position: absolute;
display: flex;
align-items: center;
bottom: 0;
left: 0;
right: 0;
height: 50px;
width: 100vw;
background-color: ${({theme}) => theme.colors.black};
color: ${({theme}) => theme.colors.white};
padding: ${({theme}) => theme.size.large} ${({theme}) => theme.size.medium};
`

export const FooterContentWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 0 2rem;
`

export const FooterContentParagraph = styled.p`
margin: 0;
`
