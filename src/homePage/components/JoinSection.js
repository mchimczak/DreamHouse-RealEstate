import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Section from '../../shared/components/Section/Section'
import Button from '../../shared/components/Button/Button';

const Wrapper = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(150px, 200px));
justify-content: center;
text-align: center;
gap: 2rem;
`

const JoinSection = () => {
    return (
        <Section>
            <Wrapper>
                <Button
                as={Link}
                to="/signup"
                primary="true"
                upc="true"
                >
                    Sign up
                </Button>
                <Button
                as={Link}
                to="/login"
                upc="true"
                >
                    Login
                </Button>
            </Wrapper>
        </Section> 
     );
}
 
export default JoinSection;