import React, {useContext, useEffect, useState, useRef} from 'react';
import {UserContext} from '../../../auth/context/UserContext';
// import EstateContext from '../../../estates/context/EstatesContext';

const InfoStatus = () => {
    const {status, setStatus} = useContext(UserContext);
    const [showState, setShowState] = useState(false);
    const init = useRef(false);

    useEffect(() => {
        if(init.current === true) {
            setTimeout(() => {
                setShowState(false);
                setStatus(false);
                init.current = false;
            }, 3000);
        } else {
            init.current = true;
            setShowState(true)
        }
    },[status]);


    return ( 
        <>
            { showState && status ? <h4>{status}</h4> : null }
        </>
     );
};
 
export default InfoStatus;
