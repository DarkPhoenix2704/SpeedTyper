import React from 'react';
import { Container, VStack } from '@chakra-ui/react';

const Layout = ({ children }: { children: React.ReactNode }) => (
    <VStack background="#141414">
        <Container
            display="flex"
            flexDirection="column"
            alignItems="center"
            minHeight="100vh"
            maxWidth={{ base: 'full', lg: 'container.xl' }}
        >
            {children}
        </Container>
    </VStack>
);

export default Layout;
