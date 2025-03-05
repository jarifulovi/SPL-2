import { useState } from 'react';
import FormValidation from '../utils/FormValidation';
import { toaster } from '../components/ui/toaster';



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


const useGroupForm = (formData, setFormData, submitCallback) => {
   
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRadioChange = (value) => {
        console.log(value);
        setFormData((prev) => ({
            ...prev,
            group_status: value,
        }));
    };

    const handleSelectType = (value) => {
        const singleValue = value[0];
        setFormData((prev) => ({
            ...prev,
            type: singleValue,
        }));
    };

    const handleSelectTopics = (value) => {
        setFormData((prev) => ({
            ...prev,
            topics: value,
        }));
    };

    const onSetFile = (file) => {
        console.log(file.files[0]);
        setFormData((prev) => ({
            ...prev,
            group_image: file.files[0],
        }));
    };

    const onClearFile = () => {
        console.log('clear file');
        setFormData((prev) => ({
            ...prev,
            group_image: null,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = FormValidation.validateCreateGroupForm(formData);
        if (Object.keys(formErrors).length === 0) {
            console.log(formData);
            const result = await submitCallback(formData);
            if (result.success) {
                toaster.create({
                    description: result.message,
                    type: 'success',
                });
            } else {
                toaster.create({
                    description: result.message,
                    type: 'error',
                });
            }
        } else {
            setErrors(formErrors);
        }
    };

    return {
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
    };
};

export default useGroupForm;