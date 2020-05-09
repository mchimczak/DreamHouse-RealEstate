import React, {useContext, useEffect, useState, useRef} from 'react';
import { StatusInfo, StatusWrapper } from './InfoStatus.style';

import {UserContext} from '../../../auth/context/UserContext';

const InfoStatus = () => {
    const {status: [status, setStatus]} = useContext(UserContext);
    const [showState, setShowState] = useState(false);
    const init = useRef(false);

    useEffect(() => {
        init.current === true 
            ?   setTimeout(() => {
                    setShowState(false);
                    setStatus(false);
                    init.current = false;
                }, 6000)
            :   init.current = true;
                setShowState(true)
    },[status]);

    return ( 
        <StatusWrapper show={status}>
            { showState && status ? <StatusInfo>{status}</StatusInfo> : null }
        </StatusWrapper>
     );
};
 
export default InfoStatus;
