import React, {useContext} from 'react'
import { Redirect, Route } from 'react-router-dom';

import { UserContext } from '../../auth/context/UserContext';


const PrivateRoute = ({component: Component, ...rest}) => {

    const {isLoggedIn} = useContext(UserContext);
    
    return ( 
        <Route {...rest}
            render={(props) => isLoggedIn === true 
            ? <Component {...props} /> 
            : <Redirect to="/login" />}
        />
     );
};
 
export default PrivateRoute;