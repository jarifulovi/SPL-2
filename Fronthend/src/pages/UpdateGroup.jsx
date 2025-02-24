import { Link as RouterLink } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';

import { toaster } from '../components/ui/toaster';

import GroupForm from '../components/Others/GroupForm';

import FormValidation from '../utils/FormValidation';
import GroupApi from '../services/GroupApi';



const items = [
    { value: "public", label: "public" },
    { value: "private", label: "private" },
];

const groupTypes = [
    { label: "study", value: "study" },
    { label: "project", value: "project" },
    { label: "research", value: "research" },
];

const groupTopics = [
    { label: "Mathematics", value: "math", type: "study" },
    { label: "Physics", value: "physics", type: "study" },
    { label: "Computer Science", value: "computer_science", type: "study" },
    { label: "AI & ML", value: "ai_ml", type: "research" },
];



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
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRadioChange = (value) => {
        setFormData({
            ...formData,
            group_status: value,
        });
    };

    const handleSelectType = (value) => {
        
        const singleValue = value[0]; 

        setFormData({
            ...formData,
            type: singleValue,
        });
    };
    
    
    const handleSelectTopics = (value) => {
       
        setFormData({
            ...formData,
            topics: value,
        });
    };
    
    const onSetFile = (file) => {
        setFile(file.files[0]);
    };

    const onClearFile = () => {
        setFile(null);
    };

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
            items={items}
            groupTypes={groupTypes}
            groupTopics={groupTopics}
            handleChange={handleChange}
            handleRadioChange={handleRadioChange}
            handleSelectType={handleSelectType}
            handleSelectTopics={handleSelectTopics}
            onSetFile={onSetFile}
            onClearFile={onClearFile}
        />        
    );

};

export default UpdateGroup;