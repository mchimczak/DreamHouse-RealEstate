import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { EstatesContext } from '../../estates/context/EstatesContext';

import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';

import Button from '../../shared/components/Button/Button';

const CardActionsWrapper = styled.div`
display: grid;
padding: 1rem;
`

const UserCard = ({ id, name, createdAt }) => {
    const {estatesData: [estatesData]} = useContext(EstatesContext);
    const initials = [...name[0]];

    let estates = 0;
    estatesData.map( el => el.owner === id ? estates++ : null );

    return (
        <Card>
            <CardHeader
                color="primary"
                avatar={ <Avatar aria-label="user">{initials}</Avatar> }
                title={name}
                subheader={`Joined: ${createdAt}`}
            />
            {
                estates > 0 
                ?   <CardActionsWrapper>
                        <Button primary="true" small="true" upc="true" as={Link} to={`/users/${id}`}>
                            View {estates} {estates === 1 ? 'offer' : 'offers'}
                        </Button>
                    </CardActionsWrapper>
                :   <CardActionsWrapper>
                        <Button primary="true" small="true" upc="true" disabled={true}>
                            View offer
                        </Button>
                    </CardActionsWrapper>
            }
        </Card>
    )
};
 
export default UserCard;

UserCard.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    createdAt: PropTypes.string
}

UserCard.defaultProps = {
    estates: 0,
    createdAt: 'We dont know'
}