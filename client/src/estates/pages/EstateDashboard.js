import React, {useContext, useState, useEffect, useRef} from 'react';
import { useParams, Redirect } from 'react-router-dom';

// import { EstatesContext } from '../context/EstatesContext';
import { UserContext } from '../../auth/context/UserContext';
import EstateItemDetails from '../components/EstateItemDetails';
import { useFetch } from '../../shared/customHooks/useFetch';
import Loader from '../../shared/components/Loader/Loader';

const EstateDashboard = () => {
    
    const estateId = useParams().estateId;
    // const {estatesData} = useContext(EstatesContext);
    const {setStatus} = useContext(UserContext);
    const [currentEstate, setCurrentEstate] = useState(null);
    const [isRedirect, setIsRedirect] = useState(false);
    const init = useRef(false);
    const initRedirect = useRef(false);
    // const currentEstate = estatesData.find( estate => estate.id === estateId);

    const fetchedEstate = useFetch(`http://localhost:5000/estates/${estateId}`);

    useEffect(() => {
        if(init.current === true) {
            init.current = false;
            setCurrentEstate(fetchedEstate);
        } else {
            init.current = true
        }
    },[fetchedEstate])

    useEffect(() => {
        if(initRedirect.current && !currentEstate) {
            initRedirect.current = false;
            setStatus('Sorry there is no estate with that ID');
            setIsRedirect(true);
        } else {
            initRedirect.current = true;
        }

        return () => {
            setIsRedirect(false)
        }
    },[currentEstate])


    return ( 
        <>
            {
                currentEstate 
                ? <EstateItemDetails key={currentEstate.id} {...currentEstate} />
                : (isRedirect ? <Redirect to="/" /> : <Loader />)
            }
        </>
     );
};
 
export default EstateDashboard;