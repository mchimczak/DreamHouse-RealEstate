import React, {useContext} from 'react';

import EstatesList from '../components/EstatesList';
import {EstatesContext} from '../context/EstatesContext';
import Loader from '../../shared/components/Loader/Loader';

const Estates = () => {
    const {estatesData} = useContext(EstatesContext);

    return ( 
        <>
            <h3>Estates</h3>
            { estatesData 
                ? ( estatesData.length === 0 
                    ? <p>There are no estates</p>
                    : <EstatesList items={estatesData} />
                    ) 
                : <Loader />
            }
        </>
     );
}
 
export default Estates;