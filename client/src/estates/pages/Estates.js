import React, {useContext, useReducer, useEffect, useRef} from 'react';

import {EstatesContext} from '../context/EstatesContext';
import { reducer, setEstates } from '../../estates/context/EstatesActions';
import { useFetch } from '../../shared/customHooks/useFetch';

import EstatesList from '../components/EstatesList';
import Loader from '../../shared/components/Loader/Loader';
import Center from '../../shared/ui/position/Center';

const Estates = () => {
    const [estateState, dispatch] = useReducer(reducer, []);
    const init = useRef(false);
    const {setEstatesLikes} = useContext(EstatesContext);
    const { estatesData, userLikes } = useFetch('http://localhost:5000/estates');

    useEffect(() => {
        if(init.current) {
            init.current = false;
            dispatch(setEstates(estatesData));
            setEstatesLikes(userLikes)
        } else {
            init.current = true;
        }
    }, [estatesData, userLikes])

    return ( 
        <>
            <h3>Estates</h3>
            { estateState && userLikes
                ? ( estateState.length === 0 
                    ? <p>There are no estates</p>
                    : <EstatesList items={estateState} />
                    ) 
                : <Center> <Loader /> </Center> 
            }
        </>
     );
}
 
export default Estates;