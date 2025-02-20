import React from "react";
import { InputAreaProps } from "../types/weather";
import styled from "styled-components";
import * as Yup from "yup";
import {Formik, Field, Form, ErrorMessage } from "formik";
import { InputContainer } from "../styles/containers";

const Input = styled.input`
    padding: 10px;
    border-radius: 10px;
    border: none;
    box-shadow: 0px 4px 10px rgb(0,0,0,0.3)`;

const Button = styled.button`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: #ca4e52;
background-image: url("search-alt-1-svgrepo-com.svg");
background-size: 20px 20px;
border: none;
background-repeat: no-repeat;
background-position: center;
transition: background-color 0.5s, background-image 0.5s;

&:hover{
background-image: url("search-alt-1-svgrepo-com_hover.svg");
background-color:rgba(0, 0, 0, 0);
border: 1px solid #ca4e52;
cursor: pointer;
transition: background-color 0.5s, background-image 0.5s;
}`

;

const validationSchema = Yup.object({
    location: Yup.string().required("Required Field")
});

function InputArea(props: InputAreaProps){

    function handleSubmit(values: { location: string }) {
        if (props.clicked) {
          props.clicked(values.location);
        }
    }


      
    
    return (
        <InputContainer>
            <Formik
            initialValues={{location: ""}}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
            validateOnChange={false}
            validateOnBlur={false}>
                    <Form>
                        <div>
                            <Field 
                            type="text"
                            placeholder="Enter a location"
                            name="location"
                            as={Input}
                            />

                            <ErrorMessage
                                name="location"
                                component="div"
                            />
                        </div>
                        <Button type="submit"/>
                    </Form>
            </Formik>
        </InputContainer>
    );
}

export default InputArea