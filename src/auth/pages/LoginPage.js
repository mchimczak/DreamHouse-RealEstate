import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import Form from '../../shared/components/Form/Form';
import loginInitState from '../components/Form/login/loginInitState';
import loginValidationSchema from '../components/Form/login/loginValidationSchema';
import Card from '../../shared/components/Card/Card'

const LoginPage = () => {
    const { login, isLoggedIn, userData } = useContext(UserContext);

    return (
        <Card title={'Login'}>
            {isLoggedIn && userData.id ? <Redirect to='/' /> : null}
            <Form
                submitAction={login}
                initState={loginInitState}
                validationSchema={loginValidationSchema} 
            /> 
        </Card>
    )
};

export default LoginPage
