import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import CloseIcon from '@material-ui/icons/Close';

const StyledParamsWrapper = styled.div`
display: grid;
grid-template-columns: 300px;
gap: 1rem;
align-items: center;
transition: .5s ease-in-out;
transform: ${({isOpen}) => isOpen ? `translateX(0)` : `translateX(100vw)`} ;
position: fixed;
top: 70px;
z-index: 500;
width: 100vw;
padding: 2rem;
background-color: ${({theme}) => theme.colors.black};
left: 0;
box-shadow: 1px 0px 4px #4a4a4a;
color: ${({theme}) => theme.colors.white};

${({theme}) => theme.media.tablet} {
    position: relative;
    grid-template-columns: auto auto;
    width: auto;
    padding: 2rem 0;
    top: auto;
    background-color: transparent;
    flex-direction: row;
    justify-content: flex-end;
    transform: translateX(0);
    box-shadow: none;
    color: ${({theme}) => theme.colors.black};
    margin-top: 2rem;

    & div:nth-of-type(1) {
        margin-right: 2rem;
    }
}

`
const StyledWrapper = styled.div`
display: grid;
grid-template-columns: 80px 1fr;
gap: 1rem;
align-items: center;
min-width: 100px;


${({theme}) => theme.media.tablet} {
    grid-template-columns: auto 1fr;
}
`
const StyledSelect = styled.select`
border: none;
padding: .5rem 1rem;

${({theme}) => theme.media.tablet} {
    box-shadow: 1px 3px 4px #bbb;
    font-size: 14px;
}
`
const StyledIconWrapper = styled.div`
display: flex;
position: fixed;
top: 100px;
right: 0;
align-items: center;
justify-content: center;
padding: .5rem 1rem;
background-color: ${({theme}) => theme.colors.black};
z-index: 501;
border-radius: 3px 0 0 3px;

${({theme}) => theme.media.tablet} {
    display: none;
}
`

const FilterData = ({setSortByValue, setLimitValue}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSortByChange = useCallback((e) => {
        setSortByValue(e.target.value);
    },[setSortByValue]);

    const handleLimitChange = useCallback((e) => {
        setLimitValue(e.target.value);
    },[setLimitValue]);

    return (
        <>
        <StyledIconWrapper>
            { isOpen 
                ?   <CloseIcon 
                        style={{ fontSize: 32, color: '#f9f9f9', zIndex: 999 }} 
                        onClick={() => setIsOpen(!isOpen)} 
                    />
                :  <SearchRoundedIcon 
                        style={{ fontSize: 32, color: '#f9f9f9', zIndex: 999 }} 
                        onClick={() => setIsOpen(!isOpen)} 
                    />
            }
        </StyledIconWrapper>
        <StyledParamsWrapper isOpen={isOpen} >
            <StyledWrapper>
                <label htmlFor="filter" >Sort by:</label>
                <StyledSelect name=""  id="SortBy" onChange={handleSortByChange}>
                    <option value="-createdAt">Date (newest)</option>
                    <option value="createdAt">Date (oldest)</option>
                    <option value="price">Price (cheapest)</option>
                    <option value="-price">Price (most expensive)</option>
                    <option value="title">Title (A-z)</option>
                    <option value="-title">Title (Z-a)</option>
                </StyledSelect>
            </StyledWrapper>
            <StyledWrapper>
                <label htmlFor="filter" >Show:</label>
                <StyledSelect name=""  id="filter" onChange={handleLimitChange}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </StyledSelect>
            </StyledWrapper>
        </StyledParamsWrapper> 
        </>
     );
}
 
export default FilterData;