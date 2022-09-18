import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { User } from '@supabase/supabase-js';
import React from 'react';

const Profile = ({ isOpen, onClose, user }: ProfileModalProps) => (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bg="#282828" color="#fff">
            <ModalHeader>Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Input
                    placeholder="Name"
                    defaultValue={user?.user_metadata.full_name}
                    size="lg"
                    marginBlock="8px"
                    _placeholder={{
                        color: '#D9D9D9',
                    }}
                />
                <Input
                    placeholder="Email"
                    size="lg"
                    defaultValue={user?.email}
                    marginBlock="8px"
                    _placeholder={{
                        color: '#D9D9D9',
                    }}
                />
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
                    Save
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
);
interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
}

export default Profile;
