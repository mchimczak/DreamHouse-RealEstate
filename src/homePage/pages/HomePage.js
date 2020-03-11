import React from 'react';

import HeroSection from '../components/HeroSection';
import Info from '../components/Info';
import BestEstates from '../components/BestEstates';



const HomePage = () => {

    return ( 
        <>
            <HeroSection />
            <Info />
            <BestEstates />
        </>
     );
}
 
export default HomePage;