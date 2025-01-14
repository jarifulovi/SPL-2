import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Text, Input, Button, Heading, VStack, HStack } from '@chakra-ui/react';
import { toaster } from '../components/ui/toaster';

import AuthFlexContainer from '../components/Auth/AuthFlexContainer';
import CustomFormInput from '../components/Auth/CustomFormInput';
import RadioButton from '../components/Buttons/RadioButton';
import UploadFile from '../components/Others/UploadFile';

import FormValidation from '../utils/FormValidation';
import ProfileApi from '../services/ProfileApi'; 



const items = [
    { value: "male", label: "male" },
    { value: "female", label: "female" },
    { value: "other", label: "other" },
    { value: "prefer not to say", label: "prefer not to say" },
];



const UpdateProfilePage = () => {

    const user_id = localStorage.getItem('user_id');
    const [formData, setFormData] = useState({
        user_id: user_id,                
        date_of_birth: '',               
        gender: '',                       
        phone_number: '',                 
        profile_picture: '',             
        address: '',                      
        bio: '',                          
        department: '',                   
        education: '',                    
        role: '',                        
        is_visible: true,                
        course_of_study: '',             
        current_year_or_semester: '',     
        hobby: '',                      
        skills: [],                     
        grade_sheet: '',                 
        resume: '',                      
        subjects: [],                   
        designation: '',               
        experience: 0,                   
        qualifications: []             
    });
    const [errors, setErrors] = useState({});
    

    const handleChange = (e) => {
        if (!e || !e.target) {
            console.error('Event or event target is undefined');
            return;
        }
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
      
    const handleArrayChange = (e) => {
        const { name, value } = e.target; 
        setFormData({
          ...formData,
          [name]: value.split(',').map((item) => item.trim()), 
        });
    };

    const handleRadioChange = (value) => {
        setFormData({
            ...formData,
            gender: value,
        });
    };


    const handleSubmit = async () => {
        e.preventDefault();

        const formErrors = FormValidation.validateUpdateProfile(formData);
        if(Object.keys(formErrors).length === 0) {
            console.log(formData);
            const result = await ProfileApi.updateProfile(formData);
            if(result.success) {
                toaster.create({
                    description: result.message,
                    type: "success",
                });
            } else {
                toaster.create({
                    description: result.message,
                    type: "error",
                });
            }
        } else {
            setErrors(formErrors);
        }
            
    }


    return (
        <AuthFlexContainer>
            <Heading mb="4" textAlign='center'>Study Sync</Heading>
            <Heading mb="4" textAlign='center'>Update your profile</Heading>

            <VStack as="form" spacing="4" onSubmit={handleSubmit}>
                
                <Input disabled placeholder={`User Id: ${user_id}`}/>
                <CustomFormInput
                    name="phone_number"
                    label="Phone Number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    type="text"
                    maxLength={20}
                    error={errors.phone_number}
                />
                <Text textStyle="2x1">Gender</Text>
                <RadioButton 
                    value={formData.gender} 
                    onChange={handleRadioChange}
                    items={items}
                />

                <HStack>
                    <Input type='date' label="Date of birth"></Input>
                    <UploadFile 
                        text="Upload Profile Pic"
                        accepts={["image/*"]}
                    />
                </HStack>
                


                <Button type="submit" colorScheme="blue" width="full">
                    Update Profile
                </Button>
            </VStack>
            
        </AuthFlexContainer>
    );
};

export default UpdateProfilePage;