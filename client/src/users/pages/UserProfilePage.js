import React, {useContext, Suspense } from 'react';

import {UserContext} from '../../auth/context/UserContext';
import Loader from '../../shared/components/Loader/Loader';
import Center from '../../shared/ui/position/Center';

import { UserProfileWrapper } from '../components/styles/UserComponents.style';

const UserDashboard = React.lazy(() => import('./UserDashboard'));
const UserDetails = React.lazy(() => import('../components/UserDetails'));

const UserProfilePage = () => {
    const {userData, updateUser} = useContext(UserContext);

    return ( 
        <UserProfileWrapper>
            <Suspense fallback={<Center cover="true"><Loader/></Center>}>
                <UserDashboard />
                <UserDetails user={userData} updateUser={updateUser} />
            </Suspense>
        </UserProfileWrapper>
     );
}
 
export default UserProfilePage;