import React from 'react';

import {
    Input,
    Textarea,
    Field,
    defineStyle
} from '@chakra-ui/react';

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
} from '@chakra-ui/form-control';

const CustomFormInput = ({ name, label, value, onChange, error, type = "text", ...props }) => {
    return (
        <FormControl isInvalid={!!error} width="100%">
            <Field.Root>
                {type === "textArea" ? (
                    <Textarea
                        className='peer'
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder=""
                        minHeight="40px"
                        maxHeight="100px"
                        {...props}
                    />
                ) : (
                    <Input
                        className='peer'
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder=""
                        type={type}
                        {...props}
                    />
                )}
                <Field.Label css={floatingStyles}>{label}</Field.Label>
            </Field.Root>
            <FormErrorMessage color='red'>{error}</FormErrorMessage>
        </FormControl>
    );
};



const floatingStyles = defineStyle({
    pos: "absolute",
    bg: "bg",
    px: "0.5",
    top: "-3",
    insetStart: "2",
    fontWeight: "normal",
    pointerEvents: "none",
    transition: "position",
    _peerPlaceholderShown: {
      color: "fg.muted",
      top: "2.5",
      insetStart: "3",
    },
    _peerFocusVisible: {
      color: "fg",
      top: "-3",
      insetStart: "2",
    },
})




export default CustomFormInput;
