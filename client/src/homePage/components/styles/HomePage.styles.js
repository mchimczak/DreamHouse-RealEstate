import styled, { css } from 'styled-components';

import Hero from '../../../img/hero.jpg';

export const HeroWrapper = styled.div`
position: relative;
display: flex;
justify-content: center;
align-items: center;
height: 400px;
`

export const HeroImgStyles = css`
position: absolute;
display: flex;
justify-content: center;
align-items: center;
height: 400px;
width: 100vw;
background-image: url(${Hero});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
filter: brightness(0.4);
z-index: 30;
`

export const ContentWrapperStyles = css`
position: relative;
margin: 0 auto;
grid-template-columns: 1fr;
grid-template-rows: repeat(3, 30px);
row-gap: 2rem;
width: 100%;
text-align: center;
padding: ${({theme}) => theme.size.large} ${({theme}) => theme.size.xlarge};
z-index: 45;
`

export const ContentStyles = css`
margin: 0 auto;
color: ${({theme}) => theme.colors.lightgrey};
`

export const ContentHeaderStyles = css`
${ContentStyles}
font-size: ${({theme}) => theme.size.xlarge};
margin: ${({theme}) => theme.size.large} 0;
`

export const ContentBodyStyles = css`
${ContentStyles}
font-size: ${({theme}) => theme.size.large};
font-weight: ${({theme}) => theme.font.thin};
`

export const RectStyles = css`
position: absolute;
bottom: -15px;
width: 30px;
height: 30px;
transform: rotate(45deg);
background-color: ${({theme}) => theme.colors.lightgrey};
z-index: 30;
`

export const InfoContentWrapperStyles = css`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
text-align: center;
justify-content: center;
align-items: baseline;
gap: 2rem;
margin-bottom: ${({theme}) => theme.size.large};
`

export const InfoContentBox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0 2rem;

& > img {
    width: 64px;
}
`

export const EstatesWrapperStyles = css`
display: flex;
overflow-x: scroll;
height: auto;
padding-bottom: 1rem;

& > div {
    &:not(:first-of-type) {
        margin-left: 10px;
    }

    flex-shrink: 0;
    margin: 0;
    max-width: 300px;
}

${({theme}) => theme.media.tablet} {
    & > div {
        max-width: 450px;
    }
}
${({theme}) => theme.media.desktop} {
    grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
    display: grid;
    gap: 2rem;
    height: auto;
    overflow: hidden;
    
    & > div:not(:first-of-type) {
        margin-left: 0;
        max-width: unset;
    }
}
`

export const BestEstatesHeaderStyles = css`
text-transform: uppercase;
font-weight: ${({theme}) => theme.font.thin};
text-align: center;
`

export const JoinSectionWrapper = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(150px, 200px));
justify-content: center;
text-align: center;
gap: 2rem;
`

export const JoinUsWrapperStyles = css`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: ${({theme}) => theme.size.medium} auto;
`

export const BtnBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: 0 auto;
width: 200px;
`