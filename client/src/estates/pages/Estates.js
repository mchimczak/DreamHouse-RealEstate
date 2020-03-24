import React, {useContext, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import {EstatesContext} from '../context/EstatesContext';
import { setEstates } from '../../estates/context/EstatesActions';
import { useFetch } from '../../shared/customHooks/useFetch';

import EstatesList from '../components/EstatesList';
import Loader from '../../shared/components/Loader/Loader';
import Center from '../../shared/ui/position/Center';

const Estates = () => {
    const init = useRef(false);
    const {estatesData: estates, dispatch, estatesLikes, setEstatesLikes} = useContext(EstatesContext);
    const { estatesData, userLikes } = useFetch('http://localhost:5000/estates');


    useEffect(() => {
        if(init.current) {
            init.current = false;
            setEstatesLikes(userLikes);
            dispatch(setEstates(estatesData));
        } else {
            init.current = true;
        }
    }, [estatesData, userLikes])

    return ( 
        <>
            <h3>Estates</h3>
            { estates && userLikes
                ? ( estates.length === 0 
                    ? <p>There are no estates</p>
                    : <EstatesList items={estates} />
                    ) 
                : <Center> <Loader /> </Center> 
            }
        </>
     );
}
 
export default Estates;

Estates.propTypes = {
    estatesData: PropTypes.array,
    userLikes: PropTypes.array,
}