import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { EstatesContext } from '../../estates/context/EstatesContext';
import { UserContext } from '../../auth/context/UserContext';
import Button from '../../shared/components/Button/Button';

import {Card, Avatar, CardHeader} from '@material-ui/core';

const CardActionsWrapper = styled.div`
display: grid;
padding: 1rem;
`

const UserCard = ({ id, name, createdAt, file }) => {
    const {estatesData: [estatesData]} = useContext(EstatesContext);
    const { userData } = useContext(UserContext);
    const initials = [...name[0]].toString().toUpperCase();

    let estates = 0;
    estatesData.map( el => el.owner === id ? estates++ : null );

    const avatar = file && file.length !== 0 
        ? <Avatar alt="user profile picture" src={`http://localhost:5000/${file[0]}`} />
        : <Avatar aria-label="user">{initials}</Avatar>

    return (
        <Card>
            <CardHeader
                color="primary"
                avatar={ avatar }
                title={name}
                subheader={`Joined: ${createdAt}`}
            />
            <CardActionsWrapper>
                { 
                    userData && userData.id == id
                    ?   <Button small="true" upc="true" as={Link} to={`/users/me/${id}`}>
                            View your profile
                        </Button>

                    : estates > 0 
                        ?   <Button primary="true" shadow="true" small="true" upc="true" as={Link} to={`/users/${id}`}>
                                View {estates} {estates === 1 ? 'offer' : 'offers'}
                            </Button>
                        :   <Button primary="true" small="true" upc="true" disabled={true}>
                                View offer
                            </Button>
                }
            </CardActionsWrapper>
        </Card>
    )
};
 
export default UserCard;

UserCard.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    file: PropTypes.arrayOf(PropTypes.string).isRequired
}

UserCard.defaultProps = {
    estates: 0
}