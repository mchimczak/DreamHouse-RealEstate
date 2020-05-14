import React from 'react'
import {Link} from 'react-router-dom';

import Button from '../../shared/components/Button/Button';
import Section from '../../shared/components/Section/Section'
import { JoinUsWrapper, BtnBox, BoxHeader } from './styles/HomePage.styles';

const EndInfo = React.memo(() => ( 
    <Section>
        <JoinUsWrapper>
        <BoxHeader>WORK WITH US!</BoxHeader>
        <p>From sales, rentals and new development to mortgages and title insurance, our agents are relentless advocates for our clients.</p>
        <BtnBox>
            <Button
                as={Link}
                to="/estates" 
                primary="true"
                title="View more"
                shadow="true"
            >
                view our offers
            </Button>
        </BtnBox>
        <p>...and find your DREAM HOUSE today.</p>
        </JoinUsWrapper>
    </Section>
),[]);
 
export default EndInfo;