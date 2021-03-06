import React, { useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

import { UserContext } from '../../auth/context/UserContext';

import Modal from '../../shared/components/Modal/Modal';
import ScrollTop from '../../routes/ScrollTop';
import Form from '../../shared/components/Form/Form';
import estateValidationSchema from './Form/EstateValidationSchema';
import MyCard from '../../shared/components/Card/Card';
import CardFields from '../../shared/components/Card/CardFields';
import ModalBox from '../../shared/components/Modal/ModalBox';
import Button from '../../shared/components/Button/Button';
import Image from '../../shared/components/ImageContainer/Image';
import ImageGallery from '../../shared/components/ImageGallery/ImageGallery';

import { CardWrapper, StyledContentWrapper, ViewGalleryButtonWrapper, StyledMediaWrapper, StyledMediaAsideWrapper, CardContentInfoWrapper, StyledCardActions, materialUIElements } from './styles/EstatesComponents.styles';
const { CardContent, Divider, MailIcon, PhoneIcon, Tooltip } = materialUIElements;


const EstateItemDetails = (props) => {
    const {isLoggedIn, userData} = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    const { id, file, email, phone, owner, createdAt, editCurrentEstate, removeCurrentEstate, ...estateInfo} = props;
    const {title, ...displayedInfo} = estateInfo;
    const ESTATE_INIT_INFO = estateInfo;
    const [mainImg, ...photos] = file;
    
    const toggleModal = () => setIsOpen(prevState => !prevState);

    const openGallery = useCallback(() => {
        setIsGalleryOpen(true);
    },[]);

    const closeGallery = useCallback(() => {
        setIsGalleryOpen(false);
    },[]);

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
    },[id, editCurrentEstate]);

    return ( 
        <>
        <CardWrapper>
            <MyCard title={props.title} createdAt={createdAt} wrap="true">
            <StyledMediaWrapper images={file}>
                <Image url={mainImg}  onClick={openGallery}/> 
                    { mainImg && <>
                        <ViewGalleryButtonWrapper>
                            <Button small="true" onClick={openGallery}>View gallery</Button>
                        </ViewGalleryButtonWrapper>
                        { photos.length !== 0 && 
                            <StyledMediaAsideWrapper images={photos}>
                                { photos.map( photo => (
                                    <Image 
                                        key={photo} 
                                        url={photo} 
                                        onClick={openGallery}
                                    /> 
                                ))}
                            </StyledMediaAsideWrapper>} 
                    </> }
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
                                    <Button primary="yes" small="true" upc="true">
                                        <Tooltip title={`E-mail owner`} arrow>
                                            <MailIcon 
                                                style={{ fontSize: 20 }}
                                                onClick={() => window.open(`mailto:${email}`, "_self")} 
                                            />
                                        </Tooltip>
                                    </Button>
                                    { phone 
                                        ?   <Button primary="yes" small="true" upc="true">
                                                <Tooltip title={`Call to owner`} arrow>
                                                    <PhoneIcon 
                                                        style={{ fontSize: 20 }}
                                                        onClick={() => window.open(`tel:${phone}`, "_self")}
                                                    />
                                                </Tooltip> 
                                            </Button>
                                        :   <Button primary="yes" small="true" upc="true" disabled={true}>
                                                <PhoneIcon 
                                                    style={{ fontSize: 20 }}
                                                />
                                            </Button>}
                                </>
                            :   <>
                                    <Button onClick={toggleModal} small="true" upc="true" title="Edit estate info"
                                    >edit</Button>
                                    <Button onClick={removeEstateItem} primary="yes"small="true" upc="true" title="Delete estate card"
                                    >delete</Button>
                                </> }
                    </StyledCardActions>
                </StyledContentWrapper>
            </MyCard>
            </CardWrapper>
            { isOpen && 
                <ScrollTop>
                    <Modal isOpen={isOpen} toggleModal={negateDeleteItem} >
                        { isDeleting 
                            ?   <ModalBox size='small' title='Delete current post?'>
                                    <Button primary="yest" onClick={confirmDeleteItem}>Yes</Button>
                                    <Button onClick={negateDeleteItem}>No</Button>
                                </ModalBox>
                            :   <MyCard title="Edit post" modal="true" fixed="true" scroll="true" close={negateDeleteItem}>
                                    <Form 
                                        submitAction={editEstateItem}
                                        initState={ESTATE_INIT_INFO}
                                        validationSchema={estateValidationSchema}
                                        fileUpload={{name: 'images', multiple: true}}
                                    />
                                </MyCard> }
                    </Modal>
                </ScrollTop> }
            { isGalleryOpen && file.length !== 0 &&
                <ImageGallery images={file} handleClose={closeGallery}/>
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
