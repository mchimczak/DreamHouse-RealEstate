import React, { useContext } from 'react';
import { useParams, Link } from "react-router-dom";
import PropTypes from 'prop-types';

import {UserContext} from '../../auth/context/UserContext';
import EstateCard from './EstateCard';
import Button from '../../shared/components/Button/Button';
import Center from '../../shared/ui/position/Center';
import Loader from '../../shared/components/Loader/Loader';

import  { EstateItemsWrapper, StyledHeader } from './styles/EstatesComponents.styles';

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