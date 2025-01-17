import { Link as RouterLink } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';

import { toaster } from '../components/ui/toaster';

import GroupForm from '../components/Others/GroupForm';

import FormValidation from '../utils/FormValidation';
import GroupApi from '../services/GroupApi';



const UpdateGroup = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { group_id } = location.state || {};

    const user_id = localStorage.getItem('user_id');
    const [formData, setFormData] = useState({
        group_id: group_id,
        group_name: '',
        group_description: '',
        group_status: 'public',
        type: '',
        topics: [],
        group_image: '',
        user_id: user_id
    });
    const [errors, setErrors] = useState({});

  

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formErrors = FormValidation.validateCreateGroupForm(formData);
        if(Object.keys(formErrors).length === 0) {
            console.log(formData);
            const result = await GroupApi.updateGroupInfo(formData);
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
    
    };

    return (
        <GroupForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            errors={errors}
            title="Update group"
            submitText="Update Group"
        />        
    );

};

export default UpdateGroup;