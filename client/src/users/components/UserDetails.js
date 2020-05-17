import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Modal from '../../shared/components/Modal/Modal';
import ScrollTop from '../../routes/ScrollTop';
import Form from '../../shared/components/Form/Form';
import updateUserValidationSchema from '../../auth/components/userProfile/onUpdateUserValidationSchema';
import Button from '../../shared/components/Button/Button';
import CardFields from '../../shared/components/Card/CardFields';
import FormCard from '../../shared/components/Card/Card';
import DefaultAvatar from '../../img/avatar.png';

import {CardContent, CardHeader, Avatar, Divider} from '@material-ui/core';
import { CardWrapper, StyledCard, StyledContentWrapper, StyledCardActions } from './styles/UserComponents.style';


const UserDetails = ({user, updateUser}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const { id, createdAt, file, email, name, phone} = user;
    const publicInfo = { name, email, phone };
    const editableUserInfo = { name, password: '', phone };
    
    const initials = name.charAt(0).toUpperCase();
    const avatar = file && file[0]
        ? <Avatar 
            alt={`${name.toUpperCase()}'s profile picture`} 
            src={`${process.env.REACT_APP_BACKEND_URL}${file[0]}`}
            imgProps={{ onError: (e) => { e.target.src = <DefaultAvatar /> } }}  
        />
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
                <ScrollTop>
                    <Modal isOpen={isOpen} toggleModal={toggleModal} >
                        <FormCard 
                            title="Edit profile" 
                            modal="true" 
                            small="true" 
                            fixed="true" 
                            scroll="true"
                            close={toggleModal}
                        >
                            <Form 
                                submitAction={startUpdateUser}
                                initState={editableUserInfo}
                                validationSchema={updateUserValidationSchema}
                                fileUpload={{name: 'avatar', multiple: false}}
                            />
                        </FormCard>
                    </Modal>
                </ScrollTop> 
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