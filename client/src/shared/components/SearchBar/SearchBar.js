import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { SearchBarWrapper, TextInput } from './SearchBar.styles';
import Button from '../Button/Button';

const SearchBar = ({ inputChangeHandler }) => {
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

    return ( 
        <SearchBarWrapper>
            <TextInput 
                type="text"
                value={value}
                placeholder="Search"
                onChange={onInputChangeHanlder}
            />
            <Button small="true" disabled={value ? false : true} onClick={handlerClear}>
                Reset
            </Button>
        </SearchBarWrapper>
     );
}
 
export default SearchBar;

SearchBar.propTypes = {
    inputChangeHandler: PropTypes.func.isRequired,
  };