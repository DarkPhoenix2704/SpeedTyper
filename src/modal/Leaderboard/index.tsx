import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useClient } from 'react-supabase';
import LeaderBoardCard from '../../components/LeaderboardCard';

const Leaderboard = ({ isOpen, onClose }: LeaderboardModalProps) => {
    const client = useClient();
    const [leaders, setLeaders] = useState([]);
    useEffect(() => {
        (async () => {
            const { data, error } = await client
                .from('typing_data')
                .select(
                    `wpm, users(
                name, email
            )`,
                )
                .limit(10)
                .order('wpm', { ascending: false });

            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            if (error) throw error;
            setLeaders(data);
        })();
        return () => {};
    }, [client]);
    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent bg="#282828" color="#fff">
                <ModalHeader>LeaderBoard</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {leaders.map((leader, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <LeaderBoardCard key={index} leader={leader} index={index} />
                    ))}
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
};
interface LeaderboardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default Leaderboard;
