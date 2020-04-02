import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Modal from '../../shared/components/Modal/Modal';
import Form from '../../shared/components/Form/Form';
import updateUserValidationSchema from '../../auth/components/Form/userProfile/onUpdateUserValidationSchema';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Button from '../../shared/components/Button/Button'

const CardWrapper = styled.div`
grid-row: 1;
${({theme}) => theme.media.tablet} {
    grid-column: 2;
}
`

const StyledCard = styled(Card)`
position: sticky;
top: 50px;
width: 100%;
max-width: 400px;
height: auto;
margin: 2rem auto;
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

const UserDetails = ({user, updateUser}) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(prevState => !prevState);

    const {id, createdAt, estates, email, ...editableUserInfo} = user;

    const startUpdateUser = async (updates) => {
        await updateUser(id, updates);
        setIsOpen(false);
    };

    return ( 
        <CardWrapper>
            <StyledCard>
                <StyledContentWrapper>
                    <CardHeader
                        title='Your profile'
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
                        <Button small="yes" onClick={toggleModal}>
                            EDIT PROFILE
                        </Button>
                    </StyledCardActions>
                </StyledContentWrapper>
            </StyledCard>
            { isOpen && 
                <Modal isOpen={isOpen} toggleModal={toggleModal} >
                    <FormWrapper>
                        <Form 
                            submitAction={startUpdateUser}
                            initState={editableUserInfo}
                            validationSchema={updateUserValidationSchema}
                        />
                    </FormWrapper>
                </Modal>
            }
        </CardWrapper>
     );
}
 
export default UserDetails;

UserDetails.propTypes = {
    user: PropTypes.object.isRequired
}