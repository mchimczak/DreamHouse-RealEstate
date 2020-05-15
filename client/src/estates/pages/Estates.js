import React, {useContext, useEffect, useState, useRef} from 'react';
import { useHistory, useLocation, Redirect } from 'react-router-dom';

import {EstatesContext} from '../context/EstatesContext';
import {UserContext} from '../../auth/context/UserContext';
import { setEstates } from '../../estates/context/EstatesActions';
import { useFetch } from '../../shared/customHooks/useFetch';

import EstatesList from '../components/EstatesList';
import Loader from '../../shared/components/Loader/Loader';
import Center from '../../shared/ui/position/Center';
import FilterData from '../../shared/components/FilterData/FilterData';
import Pagination from '../../shared/components/Pagination/Pagination';
import SearchBar from '../../shared/components/SearchBar/SearchBar';
import Wrapper from '../../shared/components/Wrapper/Wrapper';

const Estates = ({defaultQueries}) => {
    const history = useHistory();
    const { state } = history.location;
    const location = useLocation();

    const {estatesData: [estates, dispatch], estatesLikes: [estatesLikes, setEstatesLikes]} = useContext(EstatesContext);
    const {status: [, setStatus]} = useContext(UserContext);

    const [sortByValue, setSortByValue] = useState(defaultQueries.sortBy);
    const [limitValue, setLimitValue] = useState(defaultQueries.limitValue);
    const [currentPage, setCurrentPage] = useState(defaultQueries.currentPage);
    const [searchText, setSearchText] = useState(defaultQueries.searchText);
    const [isLoading, setIsLoading] = useState(true);
    const [isRedirect, setIsRedirect] = useState(false);
    const didReturn = useRef(true);

    const { 
        estatesData,
        estatesLikes: userLikes,
        allPosts,
        errorMsg,
        errorStatus 
    } = useFetch(`${process.env.REACT_APP_BACKEND_URL}estates?sortBy=${sortByValue}&limit=${limitValue}&page=${currentPage}&text=${searchText}`);
    

    useEffect(() => {
        const params = [];
        const searchParams = new URLSearchParams(location.search);
        for (const pair of searchParams.entries()) {
            params.push(pair)
         }
        const instance = Object.fromEntries(params);
    
           return location.search
            ?  ( setSortByValue(instance.sortBy),
                setLimitValue(instance.limit),
                setCurrentPage(instance.page),
                setSearchText(instance.search))
            : history.replace({
                pathname: '/estates',
                search: `?sortBy=${sortByValue}&limit=${limitValue}&search=${searchText}&page=${currentPage}`,
                state: {
                    sortBy: sortByValue,
                    limit: limitValue,
                    search: searchText,
                    page: currentPage
                    }
                });
    },[]);

    useEffect(() => {
        errorStatus === 503 && setIsRedirect(true)

        return () => setIsRedirect(false)
    },[errorStatus]);

    useEffect(() => {
        if(errorMsg || estatesData && estatesData.length === 0) { 
            if(errorMsg) { 
                setStatus(errorMsg)
                setSortByValue(defaultQueries.sortBy)
                setLimitValue(defaultQueries.limitValue)
                setCurrentPage(defaultQueries.currentPage)
                setSearchText(defaultQueries.searchText)
            }

            history.replace({
                pathname: '/estates',
                search: `?sortBy=${defaultQueries.sortBy}&limit=${defaultQueries.limitValue}&search=${defaultQueries.searchText}&page=${defaultQueries.currentPage}`,
                state: {
                    sortBy: defaultQueries.sortBy,
                    limit: defaultQueries.limitValue,
                    search: defaultQueries.searchText,
                    page: defaultQueries.currentPage
                    }
            });
        }
    },[errorMsg, estatesData]);

    useEffect(() => {
        if(!didReturn.current && state) {
            (
                sortByValue !== state.sortBy || 
                limitValue !== state.limit || 
                searchText !== state.search ||
                currentPage !== state.currentPage
            )
            && history.push({
                pathname: '/estates',
                search: `?sortBy=${sortByValue}&limit=${limitValue}&search=${searchText}&page=${currentPage}`,
                state: {
                    sortBy: sortByValue,
                    limit: limitValue,
                    search: searchText,
                    page: currentPage
                    }
                });
        } else didReturn.current = false

    },[sortByValue, limitValue, currentPage, searchText]);

    useEffect(() => {
        if(state && history.action === 'POP') {
            setSortByValue(state.sortBy);
            setLimitValue(state.limit);
            setCurrentPage(state.page);
            setSearchText(state.search);
            didReturn.current = true
        } else didReturn.current = false

    },[history.location.search]);

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
        {   isRedirect && <Redirect to="/"/>    }
        {   estatesData && estatesLikes
            ?   <>
                    <Wrapper flex>
                        <SearchBar 
                            inputChangeHandler={setSearchText} 
                            currentSearch={searchText} 
                            results={estatesData.length} 
                        />
                        { estates.length !== 0 &&
                            <FilterData 
                                currentSortValue={sortByValue} 
                                setSortByValue={setSortByValue}
                                currentLimitValue={limitValue}
                                setLimitValue={setLimitValue} 
                            />}
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

Estates.defaultProps = {
    defaultQueries: {
        sortBy: '-createdAt',
        limitValue: '10',
        currentPage: '1',
        searchText: ''
    }
}