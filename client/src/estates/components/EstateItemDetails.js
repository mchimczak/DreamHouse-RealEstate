import React, { useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

import { UserContext } from '../../auth/context/UserContext';

import Modal from '../../shared/components/Modal/Modal';
import Form from '../../shared/components/Form/Form';
import estateValidationSchema from './Form/EstateValidationSchema';
import MyCard from '../../shared/components/Card/Card';
import CardFields from '../../shared/components/Card/CardFields';
import ModalBox from '../../shared/components/Modal/ModalBox';
import Button from '../../shared/components/Button/Button';
import Image from '../../shared/components/ImageContainer/Image';

import { CardWrapper, StyledContentWrapper, StyledMediaWrapper, StyledMediaAsideWrapper, CardContentInfoWrapper, StyledCardActions, materialUIElements } from './styles/EstatesComponents.styles';
const { CardContent, Divider } = materialUIElements;


const EstateItemDetails = (props) => {
    const {isLoggedIn, userData} = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const { id, file, email, phone, owner, createdAt, editCurrentEstate, removeCurrentEstate, ...estateInfo} = props;
    const {title, ...displayedInfo} = estateInfo;
    const ESTATE_INIT_INFO = estateInfo;
    const [mainImg, ...photos] = file;
    const gallery = photos.map( photo => <Image url={photo} key={photo} /> );
    
    const toggleModal = () => setIsOpen(prevState => !prevState);

    const removeEstateItem = useCallback(() => {
        setIsDeleting(true);
        toggleModal();
    },[]);

    const confirmDeleteItem = useCallback(() => {
        removeCurrentEstate(id);
    },[id, removeCurrentEstate]);

    const negateDeleteItem = useCallback(() => {
        setIsDeleting(false);
        toggleModal();
    },[]);

    const editEstateItem = useCallback(async (updates) => {
        await editCurrentEstate(id, updates);
        toggleModal();
    },[id, editCurrentEstate]);

    return ( 
        <>
        <CardWrapper>
            <MyCard title={props.title} createdAt={createdAt}>
            <StyledMediaWrapper images={file}>
                <Image url={mainImg} /> 
                    { props.file && 
                        <StyledMediaAsideWrapper images={file}>
                            {gallery}
                        </StyledMediaAsideWrapper>
                    }
                </StyledMediaWrapper>
                <Divider light />
                <StyledContentWrapper>
                    <CardContent>
                        <CardContentInfoWrapper>
                            <CardFields data={displayedInfo} />
                        </CardContentInfoWrapper>
                    </CardContent>
                    <Divider light />
                    <StyledCardActions>
                        { ( !isLoggedIn || (isLoggedIn && userData.id !== owner) )
                            ?   <>
                                    <Button primary="yes" small="true" upc="true" title="E-mail User">
                                        <a href={`mailto:${email}`}>E-mail</a>
                                    </Button>
                                    { phone 
                                        ?   <Button primary="yes" small="true" upc="true" title="Call User">
                                                <a href={`tel:${phone}`}>Tel</a>
                                            </Button>
                                        :   <Button primary="yes" small="true" upc="true" disabled={true}>
                                                <span>Tel</span>
                                            </Button>
                                    }
                                </>
                            :   <>
                                    <Button onClick={toggleModal} small="true" upc="true" title="Edit estate info"
                                    >edit</Button>
                                    <Button onClick={removeEstateItem} primary="yes"small="true" upc="true" title="Delete estate card"
                                    >delete</Button>
                                </>
                        }
                    </StyledCardActions>
                </StyledContentWrapper>
            </MyCard>
            </CardWrapper>
            { isOpen && 
                <Modal isOpen={isOpen} toggleModal={negateDeleteItem} >
                     { isDeleting 
                        ?   <ModalBox size='small' title='Delete post?'>
                                <Button primary="yest" onClick={confirmDeleteItem}>Yes</Button>
                                <Button onClick={negateDeleteItem}>No</Button>
                            </ModalBox>
                        :   <MyCard title="Edit post" modal="true" scroll="true">
                                <Form 
                                    submitAction={editEstateItem}
                                    initState={ESTATE_INIT_INFO}
                                    validationSchema={estateValidationSchema}
                                    fileUpload={{name: 'images', multiple: true}}
                                />
                            </MyCard>
                     }
                </Modal>
            }
        </>
     );
};
 
export default EstateItemDetails;

EstateItemDetails.propTypes = {
    editCurrentEstate: PropTypes.func,
    removeCurrentEstate: PropTypes.func,
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    phone: PropTypes.string,
    file: PropTypes.arrayOf(PropTypes.string)
}
