import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { SearchBarWrapper, TextInput, Results } from './SearchBar.styles';
import Button from '../Button/Button';

const SearchBar = ({ inputChangeHandler, results }) => {
    const [value, setValue] = useState('');

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
        handleDebounce(value);
        setValue(value);
    },[]);

    const handlerClear = useCallback(() => {
        inputChangeHandler('');
        setValue('');
    },[])

    console.log(results);

    return ( 
        <SearchBarWrapper>
            <TextInput 
                type="text"
                value={value}
                placeholder="Search"
                onChange={onInputChangeHanlder}
            />
            {
                value && value.length !== 0 &&
                <>
                <Button 
                    small="true" 
                    disabled={value ? false : true} 
                    onClick={handlerClear}
                >
                    Reset
                </Button>
                <Results>{results} matches found</Results>
                </>
            }
        </SearchBarWrapper>
     );
}
 
export default SearchBar;

SearchBar.propTypes = {
    inputChangeHandler: PropTypes.func.isRequired,
    results: PropTypes.number.isRequired
  };