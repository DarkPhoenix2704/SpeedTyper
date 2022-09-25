import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Heading,
    Text,
    Link,
} from '@chakra-ui/react';

const WelcomeModal = ({ isOpen, onClose }: WelcomeModalProps) => (
    <Modal onClose={onClose} isOpen={isOpen} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent bg="#282828" color="#fff">
            <ModalHeader>
                <Heading>
                    Welcome to Speed <span style={{ color: '#FFD700' }}>Typing</span>
                </Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text fontSize="16px">
                    Speed<span style={{ color: '#FFD700' }}>Typing</span> is a web app that helps
                    you to improve your typing speed and accuracy developed by{' '}
                    <Link textColor="#E34144" href="https://github.com/DarkPhoenix2704">
                        DarkPhoenix2704
                    </Link>
                    .
                </Text>
                <Text align="center" fontSize="16px" marginTop="16px">
                    Please give a star to this project on{' '}
                    <Link textColor="#21B638" href="https://github.com/darkphoenix2704/speedTyper">
                        Github
                    </Link>
                </Text>
            </ModalBody>
            <ModalFooter>
                <Button
                    size="lg"
                    width="100%"
                    bg="#282828"
                    border="1px solid"
                    _hover={{
                        color: '#282828',
                        textColor: '#D9D9D9',
                    }}
                    onClick={onClose}
                >
                    Close
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
);
interface WelcomeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default WelcomeModal;
