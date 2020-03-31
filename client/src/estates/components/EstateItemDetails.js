import React, {useState, useContext} from 'react';
import styled from 'styled-components';

import { UserContext } from '../../auth/context/UserContext';

import Modal from '../../shared/components/Modal/Modal';
import Form from '../../shared/components/Form/Form';
import estateValidationSchema from './Form/EstateValidationSchema';
import MyCard from '../../shared/components/Card/Card';
import ModalBox from '../../shared/components/Modal/ModalBox';
import Button from '../../shared/components/Button/Button';

import House from '../../img/house.jpg'

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';


const StyledContentWrapper = styled(CardMedia)`
display: flex;
flex-direction: column;
`
const StyledMediaWrapper = styled.div`
display: grid;
grid-template: 2fr 1fr / auto;
gap: .5rem;
height: 200px;
width: 100%;
${({theme}) => theme.media.tablet} {
    height: 300px;
}
`
const StyledMediaMain = styled(CardMedia)`
height: 100%;
`
const StyledMediaAsideWrapper = styled.div`
display: grid;
grid-template: auto / 1fr 1fr 1fr;
gap: .5rem;
`
const StyledMediaAsideItem = styled(CardMedia)`
`
const CardContentInfoWrapper = styled.div`
display: grid;
grid-template-columns: auto auto;
gap: ${({theme}) => theme.size.small} ${({theme}) => theme.size.medium};
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

const EstateItemDetails = (props) => {
    const {isLoggedIn, userData} = useContext(UserContext);

    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const toggleModal = () => setIsOpen(prevState => !prevState);

    const { id, file, email, phone, owner, createdAt, editCurrentEstate, removeCurrentEstate, ...estateInfo} = props;
    const {title, ...displayedInfo} = estateInfo;
    const ESTATE_INIT_INFO = estateInfo;

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
        <div>
            <MyCard>
            <StyledMediaWrapper>
                    <StyledMediaMain 
                        image={House}
                    />
                    <StyledMediaAsideWrapper>
                        <StyledMediaAsideItem 
                        image={House}
                        />
                        <StyledMediaAsideItem 
                        image={House}
                        />
                        <StyledMediaAsideItem 
                        image={House}
                        />
                    </StyledMediaAsideWrapper>
                </StyledMediaWrapper>
                <StyledContentWrapper>
                    <CardHeader
                        title={(props.title).toUpperCase()}
                    />
                    <CardContent>
                        <CardContentInfoWrapper>
                            { Object.entries(displayedInfo).map(([title, value]) => {
                                let val = [...value].length === 0 ? 'No info provided' : value;
                                return (
                                    <div key={title}>
                                        <Typography variant="h6">
                                            <FieldTitle>{title}:</FieldTitle> {val}
                                        </Typography>
                                    </div>
                                )
                                }) 
                            }
                        </CardContentInfoWrapper>
                    </CardContent>
                    <StyledCardActions>
                        { (!isLoggedIn || (isLoggedIn && userData.id !== owner))
                            ? ( <>
                                    <Button primary="yes" small="true" cap="true">
                                        <a href={`mailto:${email}`}>Email</a>
                                    </Button>
                                    { phone 
                                        ? (<Button primary="yes" small="true" cap="true">
                                            <a href={`tel:${phone}`}>Tel</a>
                                            </Button>)
                                        : (<Button primary="yes" small="true" cap="true" disabled={true}>
                                                Tel
                                            </Button>)
                                    }
                                </> )
                            : ( <>
                                    <Button onClick={toggleModal} small="true" cap="true"
                                    >edit</Button>
                                    <Button onClick={removeEstateItem} primary="yes"small="true" cap="true"
                                    >delete</Button>
                                </> )
                        }
                    </StyledCardActions>
                </StyledContentWrapper>
            </MyCard>
            { isOpen && 
                <Modal isOpen={isOpen} toggleModal={toggleModal} >
                     { isDeleting 
                        ?   <ModalBox size='small' title='Delete post?'>
                                <Button primary="yest" onClick={confirmDeleteItem}>Yes</Button>
                                <Button onClick={negateDeleteItem}>No</Button>
                            </ModalBox>
                        :   <FormWrapper>
                                <Form 
                                    submitAction={editEstateItem}
                                    initState={ESTATE_INIT_INFO}
                                    validationSchema={estateValidationSchema}
                                />
                            </FormWrapper>
                     }
                </Modal>
            }
        </div>
     );
};
 
export default EstateItemDetails;