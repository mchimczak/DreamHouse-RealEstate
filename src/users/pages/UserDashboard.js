import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';

import EstatesList from '../../estates/components/EstatesList';
import { EstatesContext } from '../../estates/context/EstatesContext';

const UserDashboard = () => {

    const userId = useParams().userId;
    const estatesData = useContext(EstatesContext);
    const userEstates = estatesData.filter( estate => estate.creator === userId);

    return ( 
        <div>
            <p>USER DASHBOARD page</p>
            <EstatesList items={userEstates}/>
        </div>
     );
}
 
export default UserDashboard;