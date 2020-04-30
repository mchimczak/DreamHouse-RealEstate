import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SectionWrapper = styled.section`
margin: 0 0 ${({theme}) => theme.size.xxlarge} 0;
`

const Section = (props) => {
    return ( 
        <SectionWrapper>
            {props.children}
        </SectionWrapper>
     );
}
 
export default Section;

Section.propTypes = {
    children: PropTypes.node.isRequired
  };