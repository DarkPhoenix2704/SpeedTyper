import { Heading, Spinner, VStack } from '@chakra-ui/react';
import React from 'react';

const Loading = () => (
    <VStack height="100vh" justifyContent="center" alignContent="center" background="#141414">
        <Spinner size="xl" color="#fff" />
        <Heading color="#fff">
            Loading<span color="#FFD700">...</span>
        </Heading>
    </VStack>
);
export default Loading;
