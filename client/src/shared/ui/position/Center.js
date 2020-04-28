import React from 'react'
import styled from 'styled-components';

const CenterWrapper = styled.div`
display: ${({cover}) => cover ? 'flex' : 'contents'};
position: fixed;
height: 100vh;
width: 100vw;
top: 0;
right: 0;
bottom: 0;
left: 0;
justify-content: center;
align-items: center;

${({theme}) => theme.media.tablet} {
    display: flex;
    flex-direction: column;
}
`

const Center = (props) => {
    return ( 
        <CenterWrapper cover={props.cover}>
            {props.children}
        </CenterWrapper>
     );
}
 
export default Center;