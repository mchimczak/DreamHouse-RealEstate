import React from 'react';
import { Link } from 'react-router-dom';

import Section from '../../shared/components/Section/Section';
import Button from '../../shared/components/Button/Button';
import { JoinSectionWrapper } from './styles/HomePage.styles';


const JoinSection = React.memo(() => {
    return (
        <Section>
            <JoinSectionWrapper>
                <Button
                    as={Link}
                    to="/signup"
                    primary="true"
                    upc="true"
                    shadow="true"
                    title="Sign up"
                >
                    Sign up
                </Button>
                <Button
                    as={Link}
                    to="/login"
                    upc="true"
                    title="Log in"
                >
                    Log in
                </Button>
            </JoinSectionWrapper>
        </Section> 
     );
},[]);
 
export default JoinSection;