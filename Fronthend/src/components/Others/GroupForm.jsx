import {
    Heading,
    VStack,
    Button,
    Text,
} from '@chakra-ui/react';
import { toaster } from '../ui/toaster';

import CustomFormInput from '../Auth/CustomFormInput';
import AuthFlexContainer from '../Auth/AuthFlexContainer';
import RadioButton from '../Buttons/RadioButton';
import UploadFile from '../Others/UploadFile';

import FormValidation from '../../utils/FormValidation';


const items = [
    { value: "public", label: "public" },
    { value: "private", label: "private" },
];

const GroupForm = ({ formData, setFormData, handleSubmit, errors, title, submitText}) => {

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

    return (
        <AuthFlexContainer>
            <Heading mb="4" textAlign='center'>Study Sync</Heading>
            <Heading mb="4" textAlign='center'>{title}</Heading>

            <VStack as="form" spacing="4" onSubmit={handleSubmit}>

                <CustomFormInput
                    name="group_name"
                    label="Group Name"
                    value={formData.group_name}
                    onChange={handleChange}
                    type="text"
                    maxLength={20}
                    error={errors.group_name}
                />
                <CustomFormInput
                    name="group_description"
                    label="Group Description"
                    value={formData.group_description}
                    onChange={handleChange}
                    type="textArea"
                    maxLength={200}
                    error={errors.group_description}
                />
                
                <Text textStyle="2x1">Group Status </Text>
                <RadioButton value={formData.group_status} onChange={handleRadioChange} items={items} />

                <UploadFile
                    text="Upload Group Image"
                    accepts={["image/*"]}
                />

                <Button type="submit" colorScheme="blue" width="full">
                    {submitText}
                </Button>
            </VStack>
          
        </AuthFlexContainer>
    );
};

export default GroupForm;