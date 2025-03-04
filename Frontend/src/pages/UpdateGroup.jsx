import { useLocation, useNavigate } from "react-router-dom";
import React from 'react';

import GroupForm from '../components/Others/GroupForm';
import GroupApi from '../services/GroupApi';
import useGroupForm from '../hooks/useGroupForm';




const UpdateGroup = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { group_id } = location.state || {};

    const user_id = localStorage.getItem('user_id');
    const formData = {
        group_id: group_id,
        group_name: '',
        group_description: '',
        group_status: 'public',
        type: '',
        topics: [],
        group_image: '',
        user_id: user_id
    };
    const {
        items,
        groupTypes,
        groupTopics,
        file,
        errors,
        handleChange,
        handleRadioChange,
        handleSelectType,
        handleSelectTopics,
        onSetFile,
        onClearFile,
        handleSubmit,
    } = useGroupForm(formData, GroupApi.updateGroupInfo);


    return (
        <GroupForm
            formData={formData}
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