import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
position: relative;
display: flex;
justify-content: space-between;
width: 100vw;
align-items: center;
padding: 1rem 2rem;
background-color: ${({theme}) => theme.colors.black};
color: ${({theme}) => theme.colors.white};
z-index: 300;
`


const MainHeader = (props) => {
    return ( 
        <Header>
            {props.children}
        </Header>
     );
}
 
export default MainHeader;