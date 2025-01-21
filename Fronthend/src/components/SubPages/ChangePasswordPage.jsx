import React, { useState } from 'react';
import { Box, Flex, VStack } from '@chakra-ui/react';
import { Button } from "../ui/button";
import { toaster } from "../ui/toaster"

import CustomFormInput from '../Auth/CustomFormInput';

import FormValidation from '../../utils/FormValidation';
import AuthApi from '../../services/AuthApi';


const ChangePasswordPage = () => {

    const email = localStorage.getItem('email');
    const [formData, setFormData] = useState({
        email: email || '',
        old_password: '',
        new_password: '',
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
        
        setErrors({});
        const formErrors = FormValidation.validateChangePassword(formData);
        if(Object.keys(formErrors).length === 0) {
            const result = await AuthApi.updatePassword(formData);
           
            if(result.success) {
                toaster.create({
                    description: "You have successfully changed the password",
                    type:"success"
                });
                
            } else {
                toaster.create({
                    description: result.message,
                    type: "error"
                });
            }
            
        }
        else {
            setErrors(formErrors);
        }
    }


    return (
        <Box>

            <VStack as="form" spacing="4" onSubmit={handleSubmit}>
                <CustomFormInput
                    name="old_password"
                    label="Old Password"
                    type='password'
                    value={formData.old_password}
                    error={errors.old_password}
                    onChange={handleChange}
                />
                <CustomFormInput
                    name="new_password"
                    label="New Password"
                    type='password'
                    value={formData.new_password}
                    error={errors.new_password}
                    onChange={handleChange}
                />
                <CustomFormInput
                    name="confirmPassword"
                    label="Confirm Password"
                    value={formData.confirmPassword}
                    type='password'
                    error={errors.confirmPassword}
                    onChange={handleChange}
                />

                <Button type="submit" colorScheme="blue" width="full">
                    Update
                </Button>
            </VStack>
            
        </Box>
    );
};

export default ChangePasswordPage;