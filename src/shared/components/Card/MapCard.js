import React from 'react';
import styled from 'styled-components';

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
width: 70%;
height: 60%;
z-index: 100;
`
const StyledCardMedia = styled(CardMedia)`
height: 60%;
`

export const MapCard = (props) => (
    <StyledCard>
        <CardHeader
            title={props.title}
            subtitle={props.address}
        />
        <StyledCardMedia 
            image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
        />
        <CardContent>
            <Typography paragraph>
                {props.description}
            </Typography>
            {props.children}
        </CardContent>
        <CardActions>
            <IconButton aria-label="add to fav">
                <FavoriteIcon />
            </IconButton>
            <Button variant="contained">Edit</Button>
            <Button variant="contained" color='secondary'>Delete</Button>
        </CardActions>
    </StyledCard>
)