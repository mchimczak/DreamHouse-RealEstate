import React from 'react';

import HeroSection from '../components/HeroSection';
import Info from '../components/Info';
import BestEstates from '../components/BestEstates';
import JoinSection from '../components/JoinSection';
import EndInfo from '../components/EndInfo';

const HomePage = React.memo(() => ( 
    <>
        <HeroSection />
        <Info />
        <JoinSection />
        <BestEstates />
        <EndInfo/>
    </>
),[]);
 
export default HomePage;