import React, {useState, useContext} from 'react';
import styled from 'styled-components';

import { EstatesContext } from '../context/EstatesContext';
import { UserContext } from '../../auth/context/UserContext';
import Modal from '../../shared/components/Modal/Modal';
import Form from '../../shared/components/Form/Form';
import estateValidationSchema from './Form/EstateValidationSchema';

import House from '../../img/house.jpg'

// import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';

import MyCard from '../../shared/components/Card/Card';


// const StyledCard = styled(Card)`
// position: relative;
// width: 90%;
// height: 80%;
// margin: 3rem auto;
// display: flex;
// flex-direction: column-reverse;
// `
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
    const {removeEstate, editEstate} = useContext(EstatesContext);
    const {isLoggedIn, userData} = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(prevState => !prevState);

    const { id, file, ...estateInfo} = props;
    const {owner, createdAt, ...editableInfo} = estateInfo;
    const ESTATE_INIT_INFO = editableInfo;

    const removeEstateItem = () => {
        removeEstate(props);
    };
    const editEstateItem = async (updates) => {
        const id = props.id;
        await editEstate(id, updates);
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
                            { Object.entries(estateInfo).map(([title, value]) => (
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
                        {
                            isLoggedIn === false &&
                            <>
                                <IconButton aria-label="add to fav">
                                    <span>3</span><FavoriteIcon />
                                </IconButton>
                                <Button variant="contained" color='primary'>Tel</Button>
                            </>
                        }
                        { isLoggedIn && userData.id === owner &&
                            <>
                                <Button  variant="contained" color='secondary' onClick={toggleModal}
                                >EDIT</Button>
                                <Button  variant="contained" color='secondary' onClick={removeEstateItem}
                                >DELETE</Button>
                            </>
                        }
                    </StyledCardActions>
                </StyledContentWrapper>
            </MyCard>
            { isOpen && 
                <Modal isOpen={isOpen} toggleModal={toggleModal} >
                <FormWrapper>
                    <Form 
                        submitAction={editEstateItem}
                        initState={ESTATE_INIT_INFO}
                        validationSchema={estateValidationSchema}
                    />
                </FormWrapper>
                </Modal>
            }
        </div>
     );
};
 
export default EstateItemDetails;