import React, {useContext, useState, useEffect} from 'react';
import styled from 'styled-components';

import FormikForm from '../components/Formik';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import AddEstateForm from '../components/AddEstateForm';

import { EstatesContext } from '../context/EstatesContext';

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
    const {createEstate, addEstate} = useContext(EstatesContext);
    const [onSubmitInfo, setOnSubmitInfo] = useState('');

    useEffect(() => {
        let submitInfo = setTimeout(() => setOnSubmitInfo(false), 3000);

        return () => { clearTimeout(submitInfo) };
    },[!!onSubmitInfo]);

    return ( 
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
                {onSubmitInfo && <p>Estate added</p>}
                <FormikForm 
                    createEstate={createEstate} 
                    setOnSubmitInfo={setOnSubmitInfo}
                    addEstate={addEstate}
                />
            </StyledCardContent>
        </StyledCard>
     );
}
 
export default AddEstate;