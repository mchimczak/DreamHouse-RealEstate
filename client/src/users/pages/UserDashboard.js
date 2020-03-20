import React, {useContext, useEffect, useRef, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../shared/customHooks/useFetch';


import EstatesList from '../../estates/components/EstatesList';
import { EstatesContext } from '../../estates/context/EstatesContext';
import Loader from '../../shared/components/Loader/Loader'



const UserDashboard = () => {
    const userId = useParams().userId;
    const {setEstatesLikes} = useContext(EstatesContext);
    const init = useRef(false);
    const [fetchedUserEstates, setFetchedUserEstates] = useState([]);
    // const userEstates = estatesData.filter( estate => estate.owner === userId);

    const { userEstates, userLikes }  = useFetch(`http://localhost:5000/users/${userId}`);
    
    useEffect(() => {
        if(init.current === true) {
            init.current = false;
            setEstatesLikes(userLikes);
            setFetchedUserEstates(userEstates);
        } else {
            init.current = true
        }
    }, [userLikes, userEstates]);


    return ( 
        <div>
            {fetchedUserEstates
                ? (
                    fetchedUserEstates.length !== 0 
                    ? <EstatesList items={fetchedUserEstates}/> 
                    : <p>This user has no estates</p>
                    )
                : <Loader/> 
            }
        </div>
     );
}
 
export default UserDashboard;