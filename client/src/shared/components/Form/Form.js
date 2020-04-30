import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withFormik, Field } from "formik";

const StyledForm = styled.form`
display: flex;
flex-direction: column;

${({theme}) => theme.media.tablet} {
    padding: 2rem 0;
}
`
const StyledFieldWrapper = styled.div`
display: flex;
flex-direction: column;
border-radius: 3px;
`
const StyledLabel = styled.label`
font-weight: ${({theme}) => theme.font.thin};
font-size: 12px;
color: ${({theme}) => theme.colors.dark};
margin-top: 1.8rem;

&::first-letter {
    text-transform: capitalize;
}
`
const StyledField = styled(Field)`
border: none;
background-color: ${({theme, background}) => background || theme.colors.lightgrey};
padding: 1.25rem 1.4rem;
border: ${({border}) => border || 'none'};
&::focus {
    color: red;
}
`
const StyledButton = styled.button`
background-color: ${({isValid}) => isValid ? '#ff9925' : 'darkgrey'};
color: ${({isValid}) => isValid ? 'white' : 'black'};
padding: 15px;
margin-top: 4rem;
border: none;
`
const StyledImgPrevWrapper = styled.div`
display: grid;
gap: 2rem;
grid-template-columns: ${({grid}) => grid ? `repeat(auto-fill, minmax(200px, 1fr))` : '300px'};
justify-items: center;
align-items: center;
margin: 1rem 0;
overflow: hidden;
justify-content: center;
`
const StyledImgPrev = styled.img`
width: 100%;
height: 200px;
object-fit: fill;
`

const MyForm = props => {
    const { initState: {file,...initState }, fileUpload, setFieldValue, dirty, touched, errors, handleChange, handleSubmit, isSubmitting } = props;
    const [ pickedFiles, setPickedFiles ] = useState([]);
    const [ imgPrev, setImgPrev ] = useState([]);

    const SUPPORTED_FORMAT = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];


    useEffect(() => {
        const inputs = document.querySelectorAll("input");
        inputs[0].focus()
    },[]);

    useEffect(() => {
        if(!pickedFiles || pickedFiles.length === 0) return;

        setImgPrev([]);
        let imgData = [];
        pickedFiles.map( file => {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setImgPrev(prevState => ([ ...prevState, { data: fileReader.result, type: file.type} ]))
                imgData.push(file)
            };
            return fileReader.readAsDataURL(file);
        });

        setFieldValue('file', imgData);
    },[pickedFiles]);

    const handleImageUpload = (files) => {
        if(files && files.length !== 0) {
            const filesArray = Object.values(files);
            setPickedFiles(filesArray);
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            {
                Object.keys(initState).map(el => (
                    <StyledFieldWrapper key={el}>
                        <StyledLabel htmlFor={el}>
                            {(touched[el] && errors[el]) ? errors[el] : el}
                        </StyledLabel>
                        <StyledField
                            type="text"
                            name={el}
                            border={touched[el] && errors[el] && '1px solid #f18080'}
                            background={touched[el] && errors[el] && '#ffacac'}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </StyledFieldWrapper>
                ))
            }
            {   fileUpload && 
                    <>
                        <StyledFieldWrapper key={'file'}>
                            <StyledLabel htmlFor={'file'}>
                                {(touched[fileUpload.name] && errors['file']) ? errors['file'] : fileUpload.name}
                            </StyledLabel>
                            <StyledField
                                type="file"
                                name={fileUpload.name}
                                multiple={ fileUpload.multiple ? true : false}
                                border={touched[fileUpload.name] && errors['file'] && '1px solid #f18080'}
                                background={touched[fileUpload.name] && errors['file'] ? '#ffacac' : 'transparent'}
                                onChange={(event) => { handleImageUpload(event.currentTarget.files) }}
                                autoComplete="off"
                            />

                        </StyledFieldWrapper>
                    </>
            }
            <StyledImgPrevWrapper grid={fileUpload && fileUpload.multiple}>
                { imgPrev && !errors['file'] && imgPrev.map( img => (
                    SUPPORTED_FORMAT.includes(img.type) && 
                    <StyledImgPrev src={img.data} key={img.data} alt={img.data} />
                )) }
            </StyledImgPrevWrapper>
            <StyledButton 
                type="submit" 
                disabled={isSubmitting} 
                isValid={dirty && Object.keys(errors).length === 0}
            >
                Submit
            </StyledButton>
        </StyledForm>
    );
};



const MyEnhancedForm = withFormik({
    mapPropsToValues: (props) => ({
        ...props.initState
    }),
    validationSchema: (props) => props.validationSchema,
    handleSubmit: (values, bag) => {
        bag.resetForm();
        bag.props.submitAction(values)
    }
})(MyForm);

export default MyEnhancedForm;

MyEnhancedForm.propTypes = {
    submitAction: PropTypes.func.isRequired,
    validationSchema: PropTypes.any.isRequired,
    initState: PropTypes.object.isRequired,
    fileUpload: PropTypes.shape({
        multiple: PropTypes.bool,
        name: PropTypes.string
    })
};