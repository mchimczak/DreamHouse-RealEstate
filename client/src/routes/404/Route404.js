import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { UserContext } from '../../auth/context/UserContext';

const Route404 = () => {
    const { status: [, setStatus ] } = useContext(UserContext);

    useEffect(() => {
        setStatus('Error 404. Page not found')
    },[]);

    return <Redirect to="/"/>
};
 
export default Route404;