import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Header = styled.header`
position: relative;
display: flex;
justify-content: space-between;
align-items: baseline;
width: 100vw;
align-items: center;
padding: 0 ${({theme}) => theme.size.large};
background-color: ${({theme}) => theme.colors.black};
color: ${({theme}) => theme.colors.white};
z-index: 300;
`


const MainHeader = (props) => ( 
    <Header>
        {props.children}
    </Header>
);
 
export default MainHeader;

MainHeader.propTypes = {
    children: PropTypes.node.isRequired
  };