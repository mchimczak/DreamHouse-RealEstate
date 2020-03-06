import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import House from '../../img/house.jpg'

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
width: 100%;
margin: 0 auto;
`
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
display: flex;
flex-direction: column;
flex-wrap: wrap;
${({theme}) => theme.media.tablet} {
    flex-direction: row;

    & > h6 {
        margin-right: 1rem;
    }
}
${({theme}) => theme.media.desktop} {
    & > h6 {
        margin-right: 3rem;
    }
}
`

const EstateCard = (props) => {
    const title = (props.title).toUpperCase();

    return ( 
        <StyledCard>
            <CardHeader
                title={title}
            />
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
                        <b>Created at:</b>{props.createdAt}
                    </Typography>
                </CardContentInfoWrapper>
            </CardContent>
            <CardActions>
                <IconButton aria-label="add to fav">
                    <span>3</span><FavoriteIcon />
                </IconButton>
                <Button variant="contained" color='secondary'>Tel</Button>
                <Button size="small" color="primary" component={Link} to={`/estates/${props.id}`}>
                        View details
                    </Button>
            </CardActions>
        </StyledCard>
     );
}
 
export default EstateCard;