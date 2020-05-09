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
import Wrapper from '../../shared/components/Wrapper/Wrapper';

const Estates = () => {
    const {estatesData: [estates, dispatch], estatesLikes: [estatesLikes, setEstatesLikes]} = useContext(EstatesContext);

    const [sortByValue, setSortByValue] = useState('-createdAt');
    const [limitValue, setLimitValue] = useState('10');
    const [currentPage, setCurrentPage] = useState('1');
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const { 
        estatesData,
        estatesLikes: userLikes,
        allPosts 
    } = useFetch(`${process.env.REACT_APP_BACKEND_URL}estates?sortBy=${sortByValue}&limit=${limitValue}&page=${currentPage}&text=${searchText}`);

    useEffect(() => {
        setEstatesLikes(userLikes);
        dispatch(setEstates(estatesData));
        setIsLoading(false);

        return () => {
            setEstatesLikes([]);
            dispatch(setEstates([]));
            setIsLoading(false);
        }
    }, [estatesData, userLikes]);

    useEffect(() => {
        setIsLoading(true);
        setCurrentPage('1');

        return () => setIsLoading(false);
    }, [limitValue, sortByValue, searchText]);

    useEffect(() => {
        setIsLoading(true);
        return () => setIsLoading(false);
    },[currentPage]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [estatesData]);
    
    return ( <>
        { estatesData && estatesLikes
            ?   <>
                <Wrapper flex>
                    <SearchBar inputChangeHandler={setSearchText} results={estatesData.length} />
                    { estates.length !== 0
                        &&   <FilterData setSortByValue={setSortByValue} setLimitValue={setLimitValue} />}
                </Wrapper>
                {   !isLoading 
                        ? <EstatesList items={estatesData} />
                        : <Center cover='true' > <Loader/> </Center> }
                {   (estatesData.length >= limitValue || +currentPage > 1)
                        && !isLoading
                        &&  <Pagination 
                                totalPosts={allPosts} 
                                postsPerPage={limitValue} 
                                selectPage={setCurrentPage} 
                                currentPage={currentPage}
                            /> }
                </>
            :   <Center cover="true" flow="column">
                    <Loader />
                </Center> 
        }
    </> );
};
 
export default Estates;