import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Modal from '../../shared/components/Modal/Modal';
import Form from '../../shared/components/Form/Form';
import updateUserValidationSchema from '../../auth/components/userProfile/onUpdateUserValidationSchema';
import Button from '../../shared/components/Button/Button';
import CardFields from '../../shared/components/Card/CardFields';
import FormCard from '../../shared/components/Card/Card';

import {CardContent, CardHeader, Avatar, Divider} from '@material-ui/core';
import { CardWrapper, StyledCard, StyledContentWrapper, StyledCardActions } from './styles/UserComponents.style';


const UserDetails = ({user, updateUser}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const { id, createdAt, file, email, name, phone} = user;
    const publicInfo = { name, email, phone };
    const editableUserInfo = { name, password: '', phone };
    
    const initials = name.charAt(0).toUpperCase();
    const avatar = file && file.length !== 0 
    ? <Avatar alt="User profile picture" src={`${process.env.REACT_APP_BACKEND_URL}${file[0]}`} />
    : <Avatar aria-label="user">{initials}</Avatar>
    
    const toggleModal = () => setIsOpen(prevState => !prevState);

    const startUpdateUser = async (updates) => {
        await updateUser(id, updates);
        setIsOpen(false);
    };

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
                    <FormCard title="Edit profile" modal="true" small="true" fixed="true">
                        <Form 
                            submitAction={startUpdateUser}
                            initState={editableUserInfo}
                            validationSchema={updateUserValidationSchema}
                            fileUpload={{name: 'avatar', multiple: false}}
                        />
                    </FormCard>
                </Modal>
            }
        </CardWrapper>
     );
}
 
export default UserDetails;

UserDetails.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        createdAt: PropTypes.string,
        file: PropTypes.arrayOf(PropTypes.string),
        email: PropTypes.string,
        password: PropTypes.string,
        name: PropTypes.string,
        phone: PropTypes.string
    }).isRequired,
    updateUser: PropTypes.func.isRequired
}