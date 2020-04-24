import React, {useContext, useState, useEffect, useRef} from 'react';
import { useParams, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    const initRedirect = useRef(false);

    const fetchedEstate = useFetch(`http://localhost:5000/estates/${estateId}`);

    const editCurrentEstate = async(id, updates) => {
        setIsLoading(true);
        await editEstate(id, updates)
            .then(res => {
                setCurrentEstate(res);
                setIsLoading(false);
            });
    };
    const removeCurrentEstate = (estateId) => {
        removeEstate(estateId);
        setCurrentEstate(false);
        setIsRedirect(true);
    };

    useEffect(() => {
        if(init.current === true) {
            init.current = false;
            setCurrentEstate(fetchedEstate);
            setIsLoading(false);
        } else init.current = true
    },[fetchedEstate])

    useEffect(() => {
        if(initRedirect.current && !currentEstate) {
            initRedirect.current = false;
            setStatus('Sorry there is no estate with that ID');
            setIsRedirect(true);
        } else initRedirect.current = true;

        return () => setIsRedirect(false)
    },[currentEstate])


    return ( 
        <> {
            currentEstate && !isLoading
            ? <EstateItemDetails key={currentEstate.id} removeCurrentEstate ={removeCurrentEstate} editCurrentEstate={editCurrentEstate} {...currentEstate} />
            : isRedirect 
                ? <Redirect to="/" /> 
                : <Center> <Loader /> </Center>
        } </>
     );
};
 
export default EstateDashboard;

EstateDashboard.propTypes = {
    fetchedEstate: PropTypes.object
}