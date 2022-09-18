import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Word = ({ content, error, active, correct }: WordProps) => (
    <Box
        style={{ marginBlock: '6px' }}
        paddingInline="8px"
        paddingBlock="5px"
        border="0.5px solid"
        borderColor={error ? '#E34144' : active ? '#E8B929' : correct ? '#21B638' : '#1F1F1F'}
        bg="#1F1F1F"
        borderRadius="8px"
    >
        <Text color="#fff" fontSize="24px">
            {content}
        </Text>
    </Box>
);

interface WordProps {
    content: string;
    error?: boolean;
    correct?: boolean;
    active?: boolean;
}

export default Word;
