import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';

const StyledCard = styled(Card)`
font-size: 200%;
`

const UserCard = ({ id, name, image, estates }) => {

    const initials = [...name[0]];

    return (
        <StyledCard>
            <CardHeader
                color="primary"
                avatar={ <Avatar aria-label="user">{initials}</Avatar> }
                title={name}
                subheader="Joined 06.05.2029"
            />
            <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                Currently selling {estates.toString()} {estates === 1 ? 'Estate' : 'Estates'}
            </Typography>
            </CardContent>
            <CardActions>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <Button size="small" color="primary" component={Link} to={`/users/${id}`}>
                    View Users estates
                </Button>
            </CardActions>
        </StyledCard>
    )
};
 
export default UserCard;