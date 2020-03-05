import React, {useState} from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Form from '../../estates/components/Form/Form';

const SignUpPage = () => {
    
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        avatar: '',
    });

    const createNewUser = (user) => {
        console.log(user);
    }

    return ( 
        <div>
            Sign up page
            <Form 
                submitAction={createNewUser}
                initState={newUser}
            />
        </div>
     );
}
 
export default SignUpPage;