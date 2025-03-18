import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import CustomSpinner from '../components/Others/CustomSpinnner';

import GroupForm from '../components/Others/GroupForm';
import GroupApi from '../services/GroupApi';
import useGroupForm from '../hooks/useGroupForm';
import GroupMemberApi from '../services/GroupMemberApi';



const UpdateGroup = () => {

    const { id: group_id } = useParams();
    // check if user is admin of the group
    const user_id = localStorage.getItem('user_id');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdminStatus = async () => {
            if(!user_id || !group_id){
                navigate('/');
                return;
            }
            const result = await GroupMemberApi.isAdmin(user_id, group_id);
            console.log(result);
            if(!result.data){
                navigate('/');
                return;
            }
            setIsAdmin(result.data);
            setIsLoading(false);
        };
        checkAdminStatus();
    }, [user_id, group_id]);

    const [formData, setFormData] = useState({
        group_id: group_id,
        group_name: '',
        group_description: '',
        group_status: 'public',
        type: '',
        topics: [],
        group_image: null,
        user_id: user_id,
    });
    const {
        items,
        groupTypes,
        groupTopics,
        errors,
        handleChange,
        handleRadioChange,
        handleSelectType,
        handleSelectTopics,
        onSetFile,
        onClearFile,
        handleSubmit,
    } = useGroupForm(formData, setFormData, GroupApi.updateGroupInfo);


    return (
        <>
            {isLoading ? (
                <CustomSpinner />
            ) : isAdmin ? (
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
            ) : (
                <p>You do not have permission to update this group.</p>
            )}
        </>
    );
    

};

export default UpdateGroup;