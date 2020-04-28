import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {EstatesContext} from '../context/EstatesContext';
import { setEstates } from '../../estates/context/EstatesActions';
import { useFetch } from '../../shared/customHooks/useFetch';

import EstatesList from '../components/EstatesList';
import Loader from '../../shared/components/Loader/Loader';
import Center from '../../shared/ui/position/Center';
import FilterData from '../../shared/components/FilterData/FilterData';

const Estates = () => {
    const {estatesData: [estates, dispatch], estatesLikes: [estatesLikes, setEstatesLikes]} = useContext(EstatesContext);

    const [sortByValue, setSortByValue] = useState('-createdAt');
    const [limitValue, setLimitValue] = useState('10');
    const { estatesData, estatesLikes: userLikes } = useFetch(`http://localhost:5000/estates?sortBy=${sortByValue}&limit=${limitValue}`);

    useEffect(() => {
        setEstatesLikes(userLikes);
        dispatch(setEstates(estatesData));
    }, [estatesData, userLikes])

    return ( <>
        { estatesData && estatesLikes
            ? estates.length === 0 
                ?   <Center cover="true"> <h3>No offers found, please try again later.</h3> </Center> 
                :   (<>
                        <FilterData setSortByValue={setSortByValue} setLimitValue={setLimitValue} />
                        <EstatesList items={estatesData} />
                    </>)
            : <Center cover="true"> <Loader /> </Center> 
        }
    </> );
};
 
export default Estates;

Estates.propTypes = {
    estatesData: PropTypes.arrayOf(PropTypes.object),
    userLikes: PropTypes.arrayOf(PropTypes.object),
}