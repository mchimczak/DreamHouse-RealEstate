import React, { useContext, useCallback } from 'react';
import { Redirect } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import Form from '../../shared/components/Form/Form';
import userValidationSchema from '../components/signUp/onCreateUserValidationSchema';
import initUserState from '../components/signUp/initUserState';
import Card from '../../shared/components/Card/Card';
import Center from '../../shared/ui/position/Center';
import Loader from '../../shared/components/Loader/Loader';

const SignUpPage = () => {
    const { register, isLoggedIn, userData, loading: [isLoading, ] } = useContext(UserContext);
    const createNewUser = useCallback((user) => register(user),[]);

    return (
        <Center>
            { isLoading
                ?   <Loader />
                :   <Card title='Sign Up'>
                        {isLoggedIn && userData && <Redirect to={`/users/me/${userData.id}`} />}
                        <Form 
                            submitAction={createNewUser}
                            initState={initUserState}
                            validationSchema={userValidationSchema}
                            fileUpload={{name: 'avatar', multiple: false}}
                        />
                    </Card>
            }
        </Center> 
     );
}
 
export default SignUpPage;