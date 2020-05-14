import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { FiltersWrapper, StyledParamsWrapper, StyledWrapper, StyledSelect, StyledLabel, OpenIconWrapper, CloseIconWrapper, materialUIElements } from './FilterData.styles';
const { FilterListIcon, CloseIcon } = materialUIElements;

const FilterData = React.memo(({currentSortValue, setSortByValue, currentLimitValue, setLimitValue}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSortByChange = useCallback((e) => {
        setSortByValue(e.target.value);
    },[setSortByValue]);

    const handleLimitChange = useCallback((e) => {
        setLimitValue(e.target.value);
    },[setLimitValue]);

    return (
        <>
        <FiltersWrapper isOpen={isOpen}>
            <StyledParamsWrapper isOpen={isOpen} >
            <StyledWrapper>
                <StyledLabel htmlFor="sortBy" >Sort by:</StyledLabel>
                <StyledSelect name="sortBy" value={currentSortValue} id="sortBy" onChange={handleSortByChange}>
                    <option value="-createdAt">Date (newest)</option>
                    <option value="createdAt">Date (oldest)</option>
                    <option value="price">Price (cheapest)</option>
                    <option value="-price">Price (most expensive)</option>
                    <option value="title">Title (A-z)</option>
                    <option value="-title">Title (Z-a)</option>
                </StyledSelect>
            </StyledWrapper>
            <StyledWrapper>
                <StyledLabel htmlFor="limit" >Show:</StyledLabel>
                <StyledSelect name="limit" value={currentLimitValue} id="limit" onChange={handleLimitChange}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </StyledSelect>
            </StyledWrapper>
            <CloseIconWrapper isOpen={isOpen}>
                <CloseIcon 
                    style={{ fontSize: 32, color: '#f9f9f9', zIndex: 999 }} 
                    onClick={() => setIsOpen(!isOpen)} 
                />
            </CloseIconWrapper>
        </StyledParamsWrapper>
        </FiltersWrapper>
        <OpenIconWrapper isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}> 
            <FilterListIcon 
                style={{ fontSize: 32, color: '#333', zIndex: 999 }} 
                onClick={() => setIsOpen(!isOpen)} 
            />
        </OpenIconWrapper>
        </>
     );
});
 
export default FilterData;

FilterData.propTypes = {
    setLimitValue: PropTypes.func.isRequired,
    setSortByValue: PropTypes.func.isRequired
  };