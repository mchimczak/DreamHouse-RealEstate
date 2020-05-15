import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import Form from '../../shared/components/Form/Form';
import loginInitState from '../components/login/loginInitState';
import loginValidationSchema from '../components/login/loginValidationSchema';
import Card from '../../shared/components/Card/Card';
import Center from '../../shared/ui/position/Center';
import Loader from '../../shared/components/Loader/Loader';

const LoginPage = () => {
    const { login, token: [token,], userData, loading: [isLoading, ] } = useContext(UserContext);

    return (
        <Center>
            { isLoading
                ?   <Loader />
                :   <Card title={'Login'} margin="4rem auto">

                        { token && userData.id && <Redirect to='/' /> }

                        <Form
                            submitAction={login}
                            initState={loginInitState}
                            validationSchema={loginValidationSchema} 
                        /> 
                    </Card>
            }
        </Center>
    )
};

export default LoginPage
