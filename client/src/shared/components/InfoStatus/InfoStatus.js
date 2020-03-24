import React, {useContext, useEffect, useState, useRef} from 'react';
import styled from 'styled-components';

import {UserContext} from '../../../auth/context/UserContext';
// import EstateContext from '../../../estates/context/EstatesContext';

const StatusWrapper = styled.div`
display: ${props => props.show ? 'block' : 'none'};
position: fixed;
padding: 1rem 3rem;
background-color: ${({theme}) => theme.colors.darktrans};
color: ${({theme}) => theme.colors.white};
width: 100vw;
left: 0;
right: 0;
bottom: 0;
z-index: 100;
`
const StatusInfo = styled.p`
margin: 0 auto;
`

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
