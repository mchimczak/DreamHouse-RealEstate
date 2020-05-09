import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import { SearchBarWrapper, TextInput, Results, OpenIconWrapper, CloseIconWrapper, materialUIElements } from './SearchBar.styles';
const { SearchRoundedIcon, CloseIcon } = materialUIElements;

const SearchBar = React.memo(({ inputChangeHandler, results }) => {
    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const debounce = useCallback((fn, delay) => {
        let timeoutId;
        return function(...args) {
          clearInterval(timeoutId);
          timeoutId = setTimeout(() => fn.apply(this, args), delay);
        };
      },[]);

    const handleDebounce = useCallback(
        debounce(value => inputChangeHandler(value), 300)
    ,[]);

    const onInputChangeHanlder = useCallback(({ target: { value } }) => {
        value = value.replace(/[^A-Z0-9]/ig, "");
        handleDebounce(value);
        setValue(value);
    },[]);

    const handlerClear = useCallback(() => {
        inputChangeHandler('');
        setValue('');
    },[]);

    return (
        <> 
            <SearchBarWrapper isOpen={isOpen} >
                <TextInput 
                    type="text"
                    value={value}
                    placeholder="Search posts"
                    onChange={onInputChangeHanlder}
                    disabled={results === 0}
                />
                <Button 
                    small="true"
                    shadow="true"
                    square="true"
                    disabled={value && value.length !== 0 ? false : true} 
                    onClick={handlerClear}
                >
                    clear
                </Button>
                { value && value.length !== 0 && <Results>{results} matches found</Results> }
                <CloseIconWrapper isOpen={isOpen}>
                    <CloseIcon 
                        style={{ fontSize: 32, color: '#f9f9f9', zIndex: 999 }} 
                        onClick={() => setIsOpen(!isOpen)} 
                    />
                </CloseIconWrapper>
            </SearchBarWrapper>
            <OpenIconWrapper isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} > 
                <SearchRoundedIcon 
                    style={{ fontSize: 32, color: '#333', zIndex: 999 }} 
                    onClick={() => setIsOpen(!isOpen)} 
                />
            </OpenIconWrapper>
        </>
     );
});
 
export default SearchBar;

SearchBar.propTypes = {
    inputChangeHandler: PropTypes.func.isRequired,
    results: PropTypes.number.isRequired
  };