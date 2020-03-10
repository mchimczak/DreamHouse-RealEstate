import React, {useContext, useCallback} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import House from '../../img/house.jpg'

import { UserContext } from '../../auth/context/UserContext';
import  { EstatesContext } from '../../estates/context/EstatesContext';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';

import MyCard from '../../shared/components/Card/Card'

const StyledMediaWrapper = styled.div`
display: grid;
grid-template: auto / 3fr 1fr;
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
grid-template: 1fr 1fr 1fr / auto;
gap: .5rem;
`
const StyledMediaAsideItem = styled(CardMedia)`
`
const CardContentInfoWrapper = styled.div`
display: grid;
gap: .5rem;
justify-content: space-between;
grid-template-columns: auto;
align-items: baseline;

& > h6 {
    display: grid;
    grid-template-columns: 70px auto;
    gap: 1rem;
    font-size: 12px;
}
`

const EstateCard = (props) => {
    const {isLoggedIn, userData, setStatus} = useContext(UserContext);
    const {estatesLikes, addLike} = useContext(EstatesContext);
    // console.log(estatesLikes);
    const currentEstate = estatesLikes.find( estate => {
        return estate.estateId === props.id
    });
    const likesNumber = currentEstate.likes.length;

    const likeEstate = () => {
        if(isLoggedIn && userData.id) {
            const estateId = props.id;
            const userId = userData.id;

            currentEstate.likes.includes(userId) 
            ?  setStatus('You have already liked that')
            :  addLike(estateId, userId);

        } else setStatus('You have to be logged in to like this estate');
    };

    const title = (props.title).toUpperCase();

    const isUsers = useCallback((login, user) => {
        if(!!login === false) {
            return true
        } else if (login && user.id !== props.owner){
            return true
        } else {
            return false
        }
    },[props.owner]);

    return ( 
        <MyCard title={title}>
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
            <CardContent>
                <CardContentInfoWrapper>
                    <Typography variant="h6">
                        <b>City:</b> {props.city}
                    </Typography>
                    <Typography variant="h6">
                        <b>Address:</b> {props.address}
                    </Typography>
                    <Typography variant="h6">
                        <b>Price:</b>{props.price}$
                    </Typography>
                </CardContentInfoWrapper>
            </CardContent>
            <CardActions>
                { 
                    isUsers(isLoggedIn, userData) &&
                         <>
                            <IconButton aria-label="add to fav" onClick={likeEstate}>
                                <span>{likesNumber}</span><FavoriteIcon />
                            </IconButton>
                            <Button variant="contained" color='secondary'>E-MAIL</Button>
                            <Button variant="contained" color='secondary'>TEL</Button>
                        </>
                 }
                <Button size="small" color="primary" component={Link} to={`/estates/${props.id}`}>
                    View details
                </Button>
            </CardActions>
        </MyCard>
     );
}
 
export default React.memo(EstateCard);