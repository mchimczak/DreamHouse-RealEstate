import React from 'react'
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import Button from '../../shared/components/Button/Button';
import Section from '../../shared/components/Section/Section';

const JoinUsWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: ${({theme}) => theme.size.medium} auto;
`
const BtnBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: 0 auto;
width: 200px;
`

const EndInfo = () => {
    return ( 
        <Section>
            <JoinUsWrapper>
                <h4>Don't hesitate</h4>
                <BtnBox>
                    <Button
                        as={Link}
                        to="/signup" 
                        primary="true"
                        >
                            Join the community!
                    </Button>
                </BtnBox>
                <h4>and find your DREAM HOUSE today</h4>
            </JoinUsWrapper>
        </Section>
     );
}
 
export default EndInfo;