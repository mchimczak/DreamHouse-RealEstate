import React, { useContext } from 'react';
import { useParams, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {UserContext} from '../../auth/context/UserContext';
import EstateCard from './EstateCard';
import Button from '../../shared/components/Button/Button';
import Center from '../../shared/ui/position/Center';
import Loader from '../../shared/components/Loader/Loader';

const EstateItemsWrapper = styled.div`
position: relative;
display: grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
gap: 2rem;
justify-content: center;

&:last-child {
    margin: 0 auto ${({theme}) => theme.size.xlarge} auto;
}
`
const StyledHeader = styled.h3`
font-weight: 300;
`

const EstatesList = ({items}) => {

    const { userData, isLoggedIn } = useContext(UserContext);
    const { userId } = useParams();

    return (
        <EstateItemsWrapper>
            {   items.length !== 0 
                    ? items.map(item => <EstateCard key={item.id} {...item} /> )
                    : isLoggedIn && userData.id === userId
                        ?   <Center>
                                <StyledHeader>It's so empty here...</StyledHeader>
                                <Button primary="yes" upc="true" shadow='true' title="Add your first offer">
                                    <Link to='/estates/new'>Create your first offer</Link>
                                </Button>
                            </Center>
                        :   <Center><Loader/></Center>
            }
        </EstateItemsWrapper>
     );
};
 
export default EstatesList;

EstatesList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired
}