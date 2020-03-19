import React, {useState} from 'react';
import styled from 'styled-components';


import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const StyledFormControl = styled(FormControl)`

`

const FormInput = (props) => {

    const [isValid, setIsValid] = useState(false);
    const element = props.element === 'input' ? 
        (
        <>
            <InputLabel htmlFor={props.id}>
                {props.label}
            </InputLabel>
            <Input 
                id={props.id} 
                type={props.type} 
                value={props.value} 
                onChange={props.handleChange(`${props.id}`)}
            />
        </>) 
        : (
            <>
            <label htmlFor={props.id}>Description</label>
        <TextareaAutosize 
                id={props.id}
                placeholder={props.value}
                rowsMin={1}
                onChange={props.handleChange(`${props.id}`)}
            />
            </>
            );

    return ( 
        <FormControl required={props.required}>
            {element}
        </FormControl>
     );
}
 
export default FormInput;