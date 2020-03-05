import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';

import { EstatesContext } from '../context/EstatesContext';
import Modal from '../../shared/components/Modal/Modal';
import Form from './Form/Form';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';


const StyledCard = styled(Card)`
position: relative;
width: 90%;
height: 80%;
margin: 3rem auto;
display: flex;
flex-direction: column-reverse;
`
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

const EstateItemDetails = (props) => {
    const {removeEstate, editEstate} = useContext(EstatesContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(prevState => !prevState);

    const { id, file, ...estateInfo} = props;
    const {creator, createdAt, ...editableInfo} = estateInfo;
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
            <StyledCard>
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
                        <IconButton aria-label="add to fav">
                            <span>3</span><FavoriteIcon />
                        </IconButton>
                        <Button variant="contained" color='primary'>Tel</Button>
                        <Button  variant="contained" color='secondary' onClick={toggleModal}
                        >EDIT</Button>
                        <Button  variant="contained" color='secondary' onClick={removeEstateItem}>DELETE</Button>
                    </StyledCardActions>
                </StyledContentWrapper>
                <StyledMediaWrapper>
                    <StyledMediaMain 
                        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                    />
                    <StyledMediaAsideWrapper>
                        <StyledMediaAsideItem 
                        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                        />
                        <StyledMediaAsideItem 
                        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                        />
                        <StyledMediaAsideItem 
                        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                        />
                    </StyledMediaAsideWrapper>
                </StyledMediaWrapper>
            </StyledCard>
            { isOpen && 
                <Modal isOpen={isOpen} toggleModal={toggleModal} >
                <FormWrapper>
                    <Form 
                        submitAction={editEstateItem}
                        initState={ESTATE_INIT_INFO}
                    />
                </FormWrapper>
                </Modal>
            }
        </div>
     );
};
 
export default EstateItemDetails;