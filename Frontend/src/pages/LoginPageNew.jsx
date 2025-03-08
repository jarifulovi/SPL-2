import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';

import {
    Heading,
    VStack,
    Link,
    Button,
    Text,
} from '@chakra-ui/react';
import { toaster } from '../components/ui/toaster';

import ColorModeToggle from '../components/Buttons/ColorModeToggle';
import CustomFormInput from '../components/Auth/CustomFormInput';
import AuthFlexContainer from '../components/Auth/AuthFlexContainer';
import StudySyncText from '../components/Fragments/StudySyncText';

import FormValidation from '../utils/FormValidation';
import AuthApi from '../services/AuthApi';

import { SocketContext } from '../utils/SocketContext';

const LoginPageNew = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const { connectSocket, emitEvent } = useContext(SocketContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formErrors = FormValidation.validateLoginForm(formData);
        if (Object.keys(formErrors).length === 0) {
            const result = await AuthApi.loginUser(formData);
            if(result.success) {
                localStorage.setItem('user_id', result.data.user_id);
                localStorage.setItem('name', result.data.name);
                localStorage.setItem('email', formData.email);
                connectSocket();
                emitEvent('connectGroup', result.data.user_id);
                navigate('/');
            } else {
                toaster.create({
                    description: result.message,
                    type: "error",
                });
            }
        } else {
            // Set errors if validation fails
            setErrors(formErrors);
        }
    };

    return (
        <AuthFlexContainer>
            <StudySyncText></StudySyncText>
            <Heading mb="4" textAlign='center'>Log in to your study sync account</Heading>

            <VStack as="form" spacing="4" onSubmit={handleSubmit}>

                <CustomFormInput
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    type="email"
                />
                <CustomFormInput
                    name="password"
                    label="Password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    type="password"
                />

                <Button type="submit" colorPalette='blue' width="full">
                    Log In
                </Button>

                <Text fontSize="sm" textAlign="center" mt="4">
                    Don't have an account?{' '}
                    <Link as={RouterLink} to="/register" color="blue.500">
                        Sign up
                    </Link>
                </Text>
                <Text fontSize="sm" textAlign="center">
                    Forgot your password?{' '}
                    <Link as={RouterLink} to="/forgotPassword" color="blue.500">
                        Reset it here
                    </Link>
                </Text>


                <ColorModeToggle></ColorModeToggle>
            </VStack>
          
        </AuthFlexContainer>
               
    );
};



export default LoginPageNew;
