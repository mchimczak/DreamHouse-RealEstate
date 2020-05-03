import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { EstatesContext } from '../../estates/context/EstatesContext';
import { UserContext } from '../../auth/context/UserContext';
import Button from '../../shared/components/Button/Button';

import {Card, Avatar, CardHeader} from '@material-ui/core';
import { CardActionsWrapper } from './styles/UserComponents.style';


const UserCard = ({ id, name, createdAt, file }) => {
    const {estatesData: [estatesData]} = useContext(EstatesContext);
    const { userData } = useContext(UserContext);
    
    let estates = 0;
    estatesData.map( el => el.owner === id ? estates++ : null );
    
    const initials = name.charAt(0).toUpperCase();
    const avatar = file && file.length !== 0 
        ? <Avatar alt="user profile picture" src={`http://localhost:5000/${file[0]}`} />
        : <Avatar aria-label="user">{initials}</Avatar>

    return (
        <Card>
            <CardHeader
                color="primary"
                avatar={ avatar }
                title={name.charAt(0).toUpperCase() + name.slice(1)}
                subheader={`Joined: ${createdAt}`}
            />
            <CardActionsWrapper>
                { 
                    userData && userData.id === id
                        ?   <Button small="true" upc="true" shadow="true" as={Link} to={`/users/me/${id}`}>
                                view your posts
                            </Button>
                        :   estates > 0 
                                ?   <Button primary="true" shadow="true" small="true" upc="true" as={Link} to={`/users/${id}`}>
                                        View {estates} {estates === 1 ? 'post' : 'posts'}
                                    </Button>
                                :   <Button primary="true" small="true" upc="true" disabled={true}>
                                        View post
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