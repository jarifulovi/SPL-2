import {
    Heading,
    VStack,
    Button,
    Text,
} from '@chakra-ui/react';
import { toaster } from '../ui/toaster';

import CustomFormInput from '../Auth/CustomFormInput';
import CustomSelect from '../Buttons/CustomSelect';
import AuthFlexContainer from '../Auth/AuthFlexContainer';
import RadioButton from '../Buttons/RadioButton';
import UploadFile from '../Others/UploadFile';
import StudySyncText from '../Fragments/StudySyncText';


const GroupForm = ({ 
        formData, 
        handleSubmit, 
        errors, 
        title, 
        submitText,
        items,
        groupTypes,
        groupTopics,
        handleChange,
        handleRadioChange,
        handleSelectType,
        handleSelectTopics,
        onSetFile,
        onClearFile
    }) => {

    

    return (
        <AuthFlexContainer>
            <StudySyncText />
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
                <CustomSelect
                    items={groupTypes}
                    label="Select Group Type"
                    placeholder="Choose one..."
                    isMultiple={false}
                    onChange={handleSelectType}
                />
                <CustomSelect
                    items={groupTopics}
                    label="Select Group Topics"
                    placeholder="Choose topics..."
                    isMultiple={true}
                    onChange={handleSelectTopics}
                />
                
                <UploadFile
                    text="Upload Group Image"
                    accepts={["image/*"]}
                    onSetFile={onSetFile}
                    onClearFile={onClearFile}
                />

                <Button type="submit" colorPalette="blue" width="full">
                    {submitText}
                </Button>
            </VStack>
          
        </AuthFlexContainer>
    );
};

export default GroupForm;