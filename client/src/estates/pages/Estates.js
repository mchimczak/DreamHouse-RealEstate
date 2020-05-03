import React, {useContext, useEffect, useState} from 'react';

import {EstatesContext} from '../context/EstatesContext';
import { setEstates } from '../../estates/context/EstatesActions';
import { useFetch } from '../../shared/customHooks/useFetch';

import EstatesList from '../components/EstatesList';
import Loader from '../../shared/components/Loader/Loader';
import Center from '../../shared/ui/position/Center';
import FilterData from '../../shared/components/FilterData/FilterData';
import Pagination from '../../shared/components/Pagination/Pagination';
import SearchBar from '../../shared/components/SearchBar/SearchBar';

const Estates = () => {
    const {estatesData: [estates, dispatch], estatesLikes: [estatesLikes, setEstatesLikes]} = useContext(EstatesContext);

    const [sortByValue, setSortByValue] = useState('-createdAt');
    const [limitValue, setLimitValue] = useState('10');
    const [currentPage, setCurrentPage] = useState('1');
    const [searchText, setSearchText] = useState('');
    const { 
        estatesData,
        estatesLikes: userLikes,
        allPosts 
        } = useFetch(`http://localhost:5000/estates?sortBy=${sortByValue}&limit=${limitValue}&page=${currentPage}&text=${searchText}`);

    useEffect(() => {
        setEstatesLikes(userLikes);
        dispatch(setEstates(estatesData));

        return () => {
            setEstatesLikes([]);
            dispatch(setEstates([]));
        }
    }, [estatesData, userLikes]);

    useEffect(() => {
        setCurrentPage('1');
    }, [limitValue, sortByValue]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [estatesData]);
    
    return ( <>
        { estatesData && estatesLikes
            ? estates.length === 0 
                ?   <>
                        <SearchBar inputChangeHandler={setSearchText} />
                        <Center cover="true" flow="column" >
                            <p>No posts found.</p>
                        </Center>
                    </>
                :   <>
                        <SearchBar inputChangeHandler={setSearchText}/>
                        <FilterData setSortByValue={setSortByValue} setLimitValue={setLimitValue} />
                        <EstatesList items={estatesData} />
                        {
                            ( estatesData.length >= limitValue || +currentPage > 1 )
                            && <Pagination 
                                    totalPosts={allPosts} 
                                    postsPerPage={limitValue} 
                                    selectPage={setCurrentPage} 
                                    currentPage={currentPage}
                                />
                        }
                    </>
            : <Center cover="true"> <Loader /> </Center> 
        }
    </> );
};
 
export default Estates;