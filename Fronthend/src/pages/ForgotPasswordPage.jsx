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

import FormValidation from '../utils/FormValidation';
import AuthApi from '../services/AuthApi';


const ForgotPasswordPage = () => {

    const [formData, setFormData] = useState({
        email: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = FormValidation.validateForgotPassword(formData);
        if (Object.keys(formErrors).length === 0) {
            console.log(formData);
            // Send email, check email, gen token url, send url in email
            setErrors([]);
        } else {
            setErrors(formErrors);
        }
        
    }

    return (
        <AuthFlexContainer>
            <Heading mb="4" textAlign='center'>Study Sync</Heading>
            <Heading mb="4" textAlign='center'>Forgot Password</Heading>
            
            <VStack as="form" spacing="4" onSubmit={handleSubmit}>

                <CustomFormInput
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    type="email"
                />
                
                <Button type="submit" colorScheme="blue" width="full">
                    Send Reset Link
                </Button>

                <Text fontSize="sm" textAlign="center" mt="4">
                    Don't have an account?{' '}
                    <Link as={RouterLink} to="/register" color="blue.500">
                        Sign up
                    </Link>
                </Text>

                <ColorModeToggle></ColorModeToggle>
            </VStack>
        </AuthFlexContainer>
    );
};

export default ForgotPasswordPage;