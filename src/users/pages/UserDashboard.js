import React, {useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../shared/customHooks/useFetch';

import styled from 'styled-components';

import EstatesList from '../../estates/components/EstatesList';
import { EstatesContext } from '../../estates/context/EstatesContext';
import Loader from '../../img/loader.gif';

const StyledImg = styled.img`
display: flex;
margin: 4rem auto;
`

const UserDashboard = () => {
    const userId = useParams().userId;
    // const {estatesData} = useContext(EstatesContext);
    // const userEstates = estatesData.filter( estate => estate.owner === userId);

    let userEstates = useFetch(`http://localhost:5000/users/${userId}`);

    return ( 
        <div>
            {userEstates.length >= 1
                ? (
                    userEstates.length !== 0 ? 
                    <EstatesList items={userEstates}/> 
                    : <p>This user has no estates</p>
                    )
                : <StyledImg src={Loader} alt="loader" /> 
            }
        </div>
     );
}
 
export default UserDashboard;