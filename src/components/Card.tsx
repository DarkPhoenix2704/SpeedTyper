import { Box, HStack, Image, VStack, Text } from '@chakra-ui/react';
import React from 'react';

const Card = ({ image, heading, content }: CardProps) => (
    <Box backgroundColor="#282828" borderRadius="8px" paddingBlock="8px" paddingInline="16px">
        <HStack justifyContent="center">
            <Image src={image} alt="random" />
            <VStack justifyContent="space-around" color="#FFFFFF" paddingInlineStart="8px">
                <Text fontSize="18px" marginBlock={0} marginTop={0}>
                    {heading}
                </Text>
                <Text
                    fontSize="24px"
                    style={{
                        marginTop: 0,
                    }}
                >
                    {content}
                </Text>
            </VStack>
        </HStack>
    </Box>
);

interface CardProps {
    image: any;
    heading: string;
    content: string;
}

export default Card;
