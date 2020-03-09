import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';

import EstatesList from '../../estates/components/EstatesList';
import { EstatesContext } from '../../estates/context/EstatesContext';

const UserDashboard = () => {
    const userId = useParams().userId;
    const {estatesData} = useContext(EstatesContext);
    const userEstates = estatesData.filter( estate => estate.owner === userId);

    return ( 
        <div>
            {
                userEstates.length !== 0 ? 
                <EstatesList items={userEstates}/> 
                : <p>This user has no estates</p>
            }
        </div>
     );
}
 
export default UserDashboard;