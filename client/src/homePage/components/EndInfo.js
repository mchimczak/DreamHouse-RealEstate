import React from 'react'
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import Button from '../../shared/components/Button/Button';
import Section from '../../shared/components/Section/Section';
import { JoinUsWrapperStyles, BtnBox } from './styles/HomePage.styles';
const JoinUsWrapper = styled.div`${JoinUsWrapperStyles}`

const EndInfo = React.memo(() => ( 
    <Section>
        <JoinUsWrapper>
            <BtnBox>
                <Button
                    as={Link}
                    to="/estates" 
                    primary="true"
                    title="View more"
                    shadow="true"
                >
                    view more
                </Button>
            </BtnBox>
            <h4>...and find your DREAM HOUSE today.</h4>
        </JoinUsWrapper>
    </Section>
),[]);
 
export default EndInfo;