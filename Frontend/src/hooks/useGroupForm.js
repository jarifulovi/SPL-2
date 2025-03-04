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


const useGroupForm = (initialFormData, submitCallback) => {
    const [formData, setFormData] = useState(initialFormData);
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
        file,
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