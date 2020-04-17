import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Modal from '../../shared/components/Modal/Modal';
import Form from '../../shared/components/Form/Form';
import updateUserValidationSchema from '../../auth/components/userProfile/onUpdateUserValidationSchema';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

import Button from '../../shared/components/Button/Button';
import CardFields from '../../shared/components/Card/CardFields';
import Divider from '@material-ui/core/Divider';

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
margin: ${({theme}) => theme.size.xlarge} auto;
display: flex;
flex-direction: column-reverse;
`
const StyledContentWrapper = styled(CardMedia)`
display: flex;
flex-direction: column;
`
const StyledCardActions = styled(CardActions)`
flex-wrap: wrap;
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

    const { id, createdAt, file, email, password, name, phone} = user;
    const publicInfo = { name, email, phone };
    const editableUserInfo = { password, name, phone, file };

    const startUpdateUser = async (updates) => {
        await updateUser(id, updates);
        setIsOpen(false);
    };

    const initials = [...user.name[0]];
    const avatar = file && file.length !== 0 
    ? <Avatar alt="User profile picture" src={`http://localhost:5000/${file[0]}`} />
    : <Avatar aria-label="user">{initials}</Avatar>

    return ( 
        <CardWrapper>
            <StyledCard>
                <StyledContentWrapper>
                <CardHeader
                    color="primary"
                    avatar={ avatar }
                    title={'Your profile dashboard'}
                    subheader={`Joined: ${createdAt}`}
                />
                    <CardContent>
                        <CardFields data={publicInfo} />
                    </CardContent>
                    <Divider light />
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
                            fileUpload={{name: 'avatar', multiple: false}}
                        />
                    </FormWrapper>
                </Modal>
            }
        </CardWrapper>
     );
}
 
export default UserDetails;

UserDetails.propTypes = {
    user: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired
}