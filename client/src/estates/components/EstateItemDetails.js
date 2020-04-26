import React, {useState, useContext} from 'react';
import styled from 'styled-components';

import { UserContext } from '../../auth/context/UserContext';

import Modal from '../../shared/components/Modal/Modal';
import Form from '../../shared/components/Form/Form';
import estateValidationSchema from './Form/EstateValidationSchema';
import MyCard from '../../shared/components/Card/Card';
import CardFields from '../../shared/components/Card/CardFields';
import ModalBox from '../../shared/components/Modal/ModalBox';
import Button from '../../shared/components/Button/Button';
import Image from '../../shared/components/ImageContainer/Image';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';


const CardWrapper = styled.div`
&:last-child {
    ${({theme}) => theme.media.tablet} {
        margin: ${({theme}) => theme.size.xlarge} auto;
    }
}
`
const StyledContentWrapper = styled(CardMedia)`
display: flex;
flex-direction: column;
`
const StyledMediaWrapper = styled.div`
display: grid;
grid-template: ${({images}) => images.length >= 2 ? '2fr 1fr / auto' : '1fr' };
gap: .5rem;
height: auto;
width: 100%;
margin: 2rem 0;
`
const StyledMediaAsideWrapper = styled.div`
display: ${({images}) => images.length >= 2 ? 'grid' : 'none' };
grid-template: auto / 1fr 1fr 1fr;
gap: .5rem;
`
const CardContentInfoWrapper = styled.div`
display: flex;
flex-direction: column;
gap: ${({theme}) => theme.size.small} ${({theme}) => theme.size.medium};

& > div:first-child {
    grid-column: 1 / 3;
    margin-bottom: 1rem;
}

${({theme}) => theme.media.tablet} {
    display: grid;
    grid-template-columns: auto auto;
}
`
const StyledCardActions = styled(CardActions)`
flex-wrap: wrap;
`

const EstateItemDetails = (props) => {
    const {isLoggedIn, userData} = useContext(UserContext);

    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const toggleModal = () => setIsOpen(prevState => !prevState);

    const { id, file, email, phone, owner, createdAt, editCurrentEstate, removeCurrentEstate, ...estateInfo} = props;
    const {title, ...displayedInfo} = estateInfo;
    const ESTATE_INIT_INFO = estateInfo;
    const [mainImg, ...photos] = file;
    const gallery = photos.map( photo => <Image url={photo} key={photo} /> );


    const removeEstateItem = () => {
        setIsDeleting(true);
        toggleModal();
    };
    const confirmDeleteItem = () => {
        removeCurrentEstate(id);
    };
    const negateDeleteItem = () => {
        setIsDeleting(false);
        toggleModal();
    };
    const editEstateItem = async (updates) => {
        editCurrentEstate(id, updates);
        toggleModal();
    };

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
                        { (!isLoggedIn || (isLoggedIn && userData.id !== owner))
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