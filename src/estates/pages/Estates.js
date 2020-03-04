import React, {useContext} from 'react';

import EstatesList from '../components/EstatesList';
import {EstatesContext} from '../context/EstatesContext';

const Estates = () => {

    const {estatesData} = useContext(EstatesContext);

    return ( 
        <>
            <h3>Estates</h3>

            { estatesData.length === 0 ? (
                <p>There are no estates</p>
                ) : (
                <EstatesList items={estatesData} />
                ) 
            }
        </>
     );
}
 
export default Estates;