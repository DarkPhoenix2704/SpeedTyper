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
import React, { useEffect } from 'react';
import { useClient } from 'react-supabase';

const Profile = ({ isOpen, onClose }: ProfileModalProps) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const client = useClient();
    useEffect(() => {
        (async () => {
            const { data, error } = await client
                .from('users')
                .select('name, email')
                .match({ id: client.auth.user()?.id });
            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            if (error) throw error;
            setName(data[0].name);
            setEmail(data[0].email);
        })();
        return () => {};
    }, [client]);
    const submit = async () => {
        const { error } = await client
            .from('users')
            .update({ name, email })
            .match({ id: client.auth.user()?.id });
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        if (error) throw error;
        onClose();
    };
    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent bg="#282828" color="#fff">
                <ModalHeader>Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input
                        placeholder="Name"
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                        size="lg"
                        marginBlock="8px"
                        _placeholder={{
                            color: '#D9D9D9',
                        }}
                    />
                    <Input
                        placeholder="Email"
                        size="lg"
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        onClick={submit}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default Profile;
