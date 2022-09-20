import { HStack, Text, Box, VStack } from '@chakra-ui/react';
import React from 'react';

const LeaderBoardCard = ({ leader, index }: LeaderboardCardProps) => (
    <HStack
        paddingInline="16px"
        paddingBlock="8px"
        borderRadius="5px"
        backgroundColor="#141414"
        justifyContent="space-between"
        marginBlock="5px"
    >
        <HStack>
            <Box bgColor="#D9D9D9" borderRadius="50%">
                <Text paddingBlock="5px" paddingInline="12px" fontSize="xl" textColor="#282828">
                    {index + 1}
                </Text>
            </Box>
            <VStack style={{ marginInlineStart: '10px' }} alignItems="flex-start">
                <Text fontSize="xl" textColor="#fff">
                    {leader.users.name}
                </Text>
                <Text
                    style={{
                        marginTop: '0px',
                    }}
                    fontSize="lg"
                    textColor="#D9D9D9"
                >
                    {leader.users.email}
                </Text>
            </VStack>
        </HStack>
        <HStack>
            <Text fontSize="xl" textColor="#fff">
                WPM
            </Text>
            <Text fontSize="xl" textColor="#fff">
                {leader.wpm}
            </Text>
        </HStack>
    </HStack>
);

interface LeaderboardCardProps {
    leader: {
        wpm: number;
        users: {
            name: string;
            email: string;
        };
    };
    index: number;
}

export default LeaderBoardCard;
