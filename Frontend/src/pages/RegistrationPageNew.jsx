import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import {
    Box,
    Heading,
    VStack,
    Link,
    Button,
    Text,
    Flex,
} from '@chakra-ui/react';
import { toaster } from '../components/ui/toaster';


import ColorModeToggle from '../components/Buttons/ColorModeToggle';
import CustomFormInput from '../components/Auth/CustomFormInput';
import AuthFlexContainer from '../components/Auth/AuthFlexContainer';

import FormValidation from '../utils/FormValidation';
import AuthApi from '../services/AuthApi';


const RegistrationPageNew = () => {

    const navigate = useNavigate();
         
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const formErrors = FormValidation.validateRegisterForm(formData);

        if (Object.keys(formErrors).length === 0) {
            const result = await AuthApi.registerUser(formData);
            
            if (result.success) {
                toaster.create({
                    description: result.message,
                    type: "success",
                });
                navigate('/login');
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
            <Heading mb="4" textAlign='center'>Create your Study Sync account</Heading>

            <VStack as="form" spacing="4" onSubmit={handleSubmit}>

                <CustomFormInput
                    name="name"
                    label="Name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                />


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

                <CustomFormInput
                    name="confirmPassword"
                    label="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    type="password"
                />

                
                <Button type="submit" colorPalette="blue" width="full">
                    Sign Up
                </Button>

                <Text fontSize="sm" textAlign="center" mt="4">
                    By signing up, you accept our{' '}
                    <Link as={RouterLink} to="/terms" color="blue.500">
                        terms
                    </Link>{' '}
                    and{' '}
                    <Link as={RouterLink} to="/privacy" color="blue.500">
                        privacy policy
                    </Link>.
                </Text>

                <Text fontSize="sm" textAlign="center">
                    Already have an account?{' '}
                    <Link as={RouterLink} to="/login" color="blue.500">
                        Log in
                    </Link>
                </Text>

                <ColorModeToggle></ColorModeToggle>
            </VStack>
            
        </AuthFlexContainer>
       
    );
};




export default RegistrationPageNew;
