import React, {useContext} from 'react';
import { useParams, Redirect } from 'react-router-dom';

import { EstatesContext } from '../context/EstatesContext';
import EstateItemDetails from '../components/EstateItemDetails';

const EstateDashboard = () => {
    
    const estateId = useParams().estateId;
    const {estatesData} = useContext(EstatesContext);
    const currentEstate = estatesData.find( estate => estate.id === estateId);

    if(!currentEstate) {
        return <Redirect to="/estates" />
    }

    const { id } = currentEstate;

    return ( 
        <>
            <EstateItemDetails key={id} {...currentEstate} />
        </>
     );
};
 
export default EstateDashboard;