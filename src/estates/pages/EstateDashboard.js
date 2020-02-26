import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';

import { EstatesContext } from '../context/EstatesContext';
import EstateItemDetails from '../components/EstateItemDetails';

const EstateDashboard = () => {

    const estateId = useParams().estateId;
    const estatesListData = useContext(EstatesContext);
    const currentEstate = (
        estatesListData.filter( estate => estate.id === estateId)
    );
    const { id, title, description, image, address, location, creator } = currentEstate[0];

    return ( 
        <div>
            <EstateItemDetails key={id} 
                    id={id}
                    title={title}
                    description={description}
                    image={image}
                    address={address}
                    location={location}
                    creator={creator}
                />
        </div>
     );
}
 
export default EstateDashboard;