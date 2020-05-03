import React, {useContext, useEffect, useState, useRef} from 'react';
import styled from 'styled-components';

import {UserContext} from '../../../auth/context/UserContext';

import { StatusInfo, StatusWrapperStyles } from './InfoStatus.style';
const StatusWrapper = styled.div`${StatusWrapperStyles}`;

const InfoStatus = () => {
    const {status: [status, setStatus]} = useContext(UserContext);
    const [showState, setShowState] = useState(false);
    const init = useRef(false);

    useEffect(() => {
        if(init.current === true) {
            setTimeout(() => {
                setShowState(false);
                setStatus(false);
                init.current = false;
            }, 8000);
        } else {
            init.current = true;
            setShowState(true)
        }
    },[status]);


    return ( 
        <StatusWrapper show={status}>
            { showState && status ? <StatusInfo>{status}</StatusInfo> : null }
        </StatusWrapper>
     );
};
 
export default InfoStatus;
