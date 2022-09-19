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

const Leaderboard = ({ isOpen, onClose }: LeaderboardModalProps) => {
    const client = useClient();
    useEffect(() => {
        (async () => {
            // Query is incorrect
            const { data, error } = await client
                .from('typing_data')
                .select('name, email')
                .match({ id: client.auth.user()?.id });
            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            if (error) throw error;
        })();
        return () => {};
    }, [client]);
    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent bg="#282828" color="#fff">
                <ModalHeader>LeaderBoard</ModalHeader>
                <ModalCloseButton />
                <ModalBody>This is Leaderboard</ModalBody>
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
};
interface LeaderboardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default Leaderboard;
