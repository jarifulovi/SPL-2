import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    Heading,
    VStack,
    Link,
    Button,
    Text,
    useEditable,
} from '@chakra-ui/react';
import { toaster } from '../components/ui/toaster';

import ColorModeToggle from '../components/Buttons/ColorModeToggle';
import CustomFormInput from '../components/Auth/CustomFormInput';
import AuthFlexContainer from '../components/Auth/AuthFlexContainer';
import StudySyncText from "../components/Fragments/StudySyncText";

import FormValidation from '../utils/FormValidation';
import AuthApi from '../services/AuthApi';



const ResetPasswordPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // Extract token from URL query string
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    // State to control rendering
    const [isValidToken, setIsValidToken] = useState(null);

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            setIsValidToken(true);
        }
    }, [token, navigate]);
    
    

    const [formData, setFormData] = useState({
        email: '',
        new_password: '',
        token: token || '',
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
        
        const formErrors = FormValidation.validateResetPassword(formData);
        if (Object.keys(formErrors).length === 0) {
            console.log(formData);
            const result = await AuthApi.resetPassword(formData);
            if(result.success) {
                toaster.create({
                    description: result.message,
                    type: "success"
                });
            } else {
                toaster.create({
                    description: result.message,
                    type: "error"
                });
            }
            setErrors([]);
        } else {
            setErrors(formErrors);
        }

    }

    if (isValidToken === null) {
        return null;
    }
    return (
        <AuthFlexContainer>
            <StudySyncText />
            <Heading mb="4" textAlign='center'>Reset Password</Heading>

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
                    name="new_password"
                    label="New Password"
                    value={formData.new_password}
                    onChange={handleChange}
                    error={errors.new_password}
                    type="password"
                />
                
                <Button type="submit" colorPalette="blue" width="full">
                    Reset Password
                </Button>

                <ColorModeToggle></ColorModeToggle>
            </VStack>
        </AuthFlexContainer>
    );
};

export default ResetPasswordPage;