import React, {useContext} from 'react';

import EstatesList from '../components/EstatesList';
import {EstatesContext} from '../context/EstatesContext';

const Estates = () => {

    const estatesListData = useContext(EstatesContext);

    return ( 
        <>
            <h3>Estates</h3>
            <EstatesList items={estatesListData} />
        </>
     );
}
 
export default Estates;