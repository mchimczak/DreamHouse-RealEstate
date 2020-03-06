import React, {useState} from 'react';
import styled from 'styled-components';

import Modal from '../../shared/components/Modal/Modal';
import Form from '../../shared/components/Form/Form';
import userProfileValidationSchema from '../../auth/components/Form/userProfile/userProfileValidationSchema';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const StyledCard = styled(Card)`
position: relative;
width: 100%;
height: auto;
margin: 3rem auto;
display: flex;
flex-direction: column-reverse;
`
const StyledContentWrapper = styled(CardMedia)`
display: flex;
flex-direction: column;
`
const CardContentInfoWrapper = styled.div`
display: flex;
flex-direction: column;
flex-wrap: wrap;
`
const StyledCardActions = styled(CardActions)`
flex-wrap: wrap;
`
const FieldTitle = styled.span`
font-weight: ${({theme}) => theme.font.bold};
text-transform: capitalize;
`
const FormWrapper = styled.div`
display: grid;
z-index: 999;
width: 90%;
max-width: 900px;
padding: 3rem 2rem;
margin-top: 150px;
border-radius: 3px;
background-color: ${({theme}) => theme.colors.white};
align-items: center;

& > form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}
`

const UserDetails = ({user}) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(prevState => !prevState);

    const {id, createdAt, estates, ...editableUserInfo} = user;

    return ( 
        <div>
            <StyledCard>
                <StyledContentWrapper>
                    <CardHeader
                        title='Profile'
                    />
                    <CardContent>
                        <CardContentInfoWrapper>
                        { Object.entries(user).map(([title, value]) => (
                                    <div key={title}>
                                        <Typography variant="h6">
                                            <FieldTitle>{title}:</FieldTitle> {value}
                                        </Typography>
                                    </div>
                                )) 
                            }
                        </CardContentInfoWrapper>
                    </CardContent>
                    <StyledCardActions>
                        <Button  variant="contained" color='secondary' onClick={toggleModal}>
                            EDIT PROFILE
                        </Button>
                    </StyledCardActions>
                </StyledContentWrapper>
            </StyledCard>
            { isOpen && 
                <Modal isOpen={isOpen} toggleModal={toggleModal} >
                    <FormWrapper>
                        <Form 
                            submitAction={() => console.log('elo')}
                            initState={editableUserInfo}
                            validationSchema={userProfileValidationSchema}
                        />
                    </FormWrapper>
                </Modal>
            }
        </div>
     );
}
 
export default UserDetails;