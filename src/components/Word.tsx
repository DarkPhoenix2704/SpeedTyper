/* eslint-disable no-nested-ternary */
import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useTyper } from '../context/typer';

const Word = ({ content, index }: WordProps) => {
    const { activeIndex, wrongIndex, correctIndex } = useTyper();
    return (
        <Box
            style={{ marginBlock: '6px' }}
            paddingInline="8px"
            paddingBlock="5px"
            border="0.5px solid"
            borderColor={
                activeIndex === index
                    ? '#E8B929'
                    : wrongIndex.includes(index)
                    ? '#E34144'
                    : correctIndex.includes(index)
                    ? '#21B638'
                    : '#1F1F1F'
            }
            bg="#1F1F1F"
            borderRadius="8px"
        >
            <Text color="#fff" fontSize="24px">
                {content}
            </Text>
        </Box>
    );
};

interface WordProps {
    content: string;
    index?: number;
}

export default Word;
