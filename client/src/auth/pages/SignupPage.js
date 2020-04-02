import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';

// import styled from 'styled-components';

import { UserContext } from '../context/UserContext';
import Form from '../../shared/components/Form/Form';
import userValidationSchema from '../components/signUp/onCreateUserValidationSchema';
import initUserState from '../components/signUp/initUserState';
import Card from '../../shared/components/Card/Card'
import Center from '../../shared/ui/position/Center'

const SignUpPage = () => {

    const { register, isLoggedIn, userData } = useContext(UserContext);

    const createNewUser = async (user) => {
        await register(user);
    }

    return (
        <Center>
            <Card title='Sign Up'>
                {isLoggedIn && userData && <Redirect to={`/users/me/${userData.id}`} />}
                <Form 
                    submitAction={createNewUser}
                    initState={initUserState}
                    validationSchema={userValidationSchema}
                />
            </Card>
        </Center> 
     );
}
 
export default SignUpPage;