import React, {useState, useContext} from 'react';
import styled from 'styled-components';

import { EstatesContext } from '../context/EstatesContext';
import EditStateForm from './EditEstateForm';
import Modal from '../../shared/components/Modal/Modal';

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
// const ActionsWrapper = styled.div`
// display: flex;
// flex-direction: row;
// width: 100%;
// margin-top: 1rem;
// `

const EstateItemDetails = (props) => {
    const {removeEstate, editEstate} = useContext(EstatesContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(prevState => !prevState);

    const title = (props.title).toUpperCase();
    // console.log(props);

    const removeEstateItem = () => {
        removeEstate(props);
    };
    const editEstateItem = (id ,updates) => {
        // console.log(updates);
        editEstate(id, updates);
        setIsOpen(false);
    };

    return ( 
        <div>
            <StyledCard>
                <StyledContentWrapper>
                    <CardHeader
                        title={title}
                    />
                    <CardContent>
                    <CardContentInfoWrapper>
                        <Typography variant="h6">
                            <b>City:</b> {props.city}
                        </Typography>
                        <Typography variant="h6">
                            <b>Address:</b> {props.address}
                        </Typography>
                        <Typography variant="h6">
                            <b>Area:</b>{props.area}
                        </Typography>
                        <Typography variant="h6">
                            <b>Rooms:</b>{props.rooms}
                        </Typography>
                        <Typography variant="h6">
                            <b>Year:</b>{props.year}
                        </Typography>
                        <Typography variant="h6">
                            <b>Price:</b>{props.price}$
                        </Typography>
                        <Typography variant="h6">
                            <b>Description:</b>{props.description}
                        </Typography>
                        <Typography variant="h6">
                            <b>Created at:</b>{props.createdAt}
                        </Typography>
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
                <Modal 
                    isOpen={isOpen} 
                    toggleModal={toggleModal}
                >
                    <EditStateForm {...props} editEstate={editEstateItem}/>
                </Modal>
            }
        </div>
     );
}
 
export default EstateItemDetails;