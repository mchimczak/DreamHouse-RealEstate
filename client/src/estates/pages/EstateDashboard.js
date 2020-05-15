import React, {useContext, useState, useEffect, useRef, useCallback} from 'react';
import { useParams, Redirect } from 'react-router-dom';

import { EstatesContext } from '../context/EstatesContext';
import { UserContext } from '../../auth/context/UserContext';
import EstateItemDetails from '../components/EstateItemDetails';
import { useFetch } from '../../shared/customHooks/useFetch';
import Loader from '../../shared/components/Loader/Loader';
import Center from '../../shared/ui/position/Center';

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
                if (res) setCurrentEstate(res);
                setIsLoading(false);
            }).catch(() => setIsLoading(false))
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
                setStatus('Sorry, we could not found that post');
            }
        } else init.current = true
    },[fetchedEstate])


    return ( 
        <> {
            currentEstate && !isLoading
            ? <EstateItemDetails 
                    key={currentEstate.id} 
                    removeCurrentEstate={removeCurrentEstate} 
                    editCurrentEstate={editCurrentEstate} 
                    {...currentEstate} 
                />
            : isRedirect 
                ? <Redirect to="/" /> 
                : <Center cover="true"> <Loader /> </Center>
        } </>
     );
};
 
export default EstateDashboard;