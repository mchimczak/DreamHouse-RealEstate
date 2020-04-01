import React, {useContext, useState} from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Form from '../../shared/components/Form/Form';
import estateValidationSchema from '../components/Form/EstateValidationSchema';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import { EstatesContext } from '../context/EstatesContext';
import { UserContext } from '../../auth/context/UserContext';

const StyledCard = styled(Card)`
position: relative;
width: 80%;
display: flex;
flex-direction: column;
margin: ${({theme}) => theme.size.large} auto;


${({theme}) => theme.media.tablet} {
        display: grid;
        grid-template: auto / 1fr 1fr;
    }
}
`
const StyledCardContent = styled(CardContent)`
padding: ${({theme}) => theme.size.large};
`
const StyledMediaMain = styled(CardMedia)`
height: 150px;
${({theme}) => theme.media.tablet} {
    height: 100%;
}
}
`

const AddEstate = () => {
    const { addEstate } = useContext(EstatesContext);
    const { userData } = useContext(UserContext);
    const [isRedirect, setIsRedirect] = useState(false);

    const getOwner = () => {
       return userData.id ? userData.id : '';
    };
    const getPhone = () => {
        return userData.phone ? userData.phone : ''
    };

    const createEstate = async (values) => {
        addEstate({
            owner: getOwner(),
            email: userData.email,
            phone: getPhone(),
            ...values
        });
        setIsRedirect(true);
    };

    return (
        <> 
            {isRedirect ? <Redirect to="/estates" /> : null}
            <StyledCard>
                <CardMedia>
                    <StyledMediaMain 
                        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                    />
                </CardMedia>
                <StyledCardContent>
                    <p>Tired of searching a buyer?</p>
                    <p>Let them find you!</p>
                    <h3>Create new advertisement and wait for a call, it's that simple.</h3>
                    <Form 
                        submitAction={createEstate}
                        validationSchema={estateValidationSchema}
                    />
                </StyledCardContent>
            </StyledCard>
        </>
     );
}
 
export default AddEstate;