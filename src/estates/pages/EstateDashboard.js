import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';

import { EstatesContext } from '../context/EstatesContext';
import EstateItemDetails from '../components/EstateItemDetails';

const EstateDashboard = () => {
    
    const estateId = useParams().estateId;
    const {estatesData} = useContext(EstatesContext);
    const currentEstate = (
        estatesData.find( estate => estate.id === estateId)
    );
    // console.log(
    //     estatesData.find( estate => estate.id === estateId)
    // );

    if(!currentEstate) {
        return <p>Something went wrong</p>
    }

    const { id } = currentEstate;

    return ( 
        <>
            <EstateItemDetails key={id}
                    {...currentEstate}
            />
        </>
     );
}
 
export default EstateDashboard;