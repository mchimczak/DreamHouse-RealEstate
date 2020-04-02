import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import Form from '../../shared/components/Form/Form';
import loginInitState from '../components/login/loginInitState';
import loginValidationSchema from '../components/login/loginValidationSchema';
import Card from '../../shared/components/Card/Card';
import Center from '../../shared/ui/position/Center'

const LoginPage = () => {
    const { login, isLoggedIn, userData } = useContext(UserContext);

    return (
        <Center>
            <Card title={'Login'}>
                {isLoggedIn && userData.id ? <Redirect to='/' /> : null}
                <Form
                    submitAction={login}
                    initState={loginInitState}
                    validationSchema={loginValidationSchema} 
                /> 
            </Card>
        </Center>
    )
};

export default LoginPage
