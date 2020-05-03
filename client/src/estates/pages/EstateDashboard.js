import React, {useContext, useState, useEffect, useRef} from 'react';
import { useParams, Redirect } from 'react-router-dom';

import { EstatesContext } from '../context/EstatesContext';
import { UserContext } from '../../auth/context/UserContext';
import EstateItemDetails from '../components/EstateItemDetails';
import { useFetch } from '../../shared/customHooks/useFetch';
import Loader from '../../shared/components/Loader/Loader';
import Center from '../../shared/ui/position/Center';
import { useCallback } from 'react';

const EstateDashboard = () => {
    const estateId = useParams().estateId;

    const {removeEstate, editEstate} = useContext(EstatesContext);
    const {status: [, setStatus]} = useContext(UserContext);

    const [currentEstate, setCurrentEstate] = useState(null);
    const [isRedirect, setIsRedirect] = useState(false);
    const [isLoading, setIsLoading]= useState(true);
    const init = useRef(false);

    const fetchedEstate = useFetch(`${process.env.REACT_APP_BACKEND_URL}estates/${estateId}`);

    const editCurrentEstate = useCallback(async(id, updates) => {
        setIsLoading(true);
        await editEstate(id, updates)
            .then(res => {
                setCurrentEstate(res);
                setIsLoading(false);
            });
    },[]);
    
    const removeCurrentEstate = useCallback((estateId) => {
        removeEstate(estateId);
        setCurrentEstate(false);
        setIsRedirect(true);
    },[]);

    useEffect(() => {
        if(init.current === true) {
            init.current = false;
            if(fetchedEstate && fetchedEstate.id) {
                setCurrentEstate(fetchedEstate);
                setIsLoading(false);
            } else {
                setIsRedirect(true);
                setStatus('Sorry there is no such offer');
            }
        } else init.current = true
    },[fetchedEstate])


    return ( 
        <> {
            currentEstate && !isLoading
            ? <EstateItemDetails key={currentEstate.id} removeCurrentEstate={removeCurrentEstate} editCurrentEstate={editCurrentEstate} {...currentEstate} />
            : isRedirect 
                ? <Redirect to="/" /> 
                : <Center> <Loader /> </Center>
        } </>
     );
};
 
export default EstateDashboard;