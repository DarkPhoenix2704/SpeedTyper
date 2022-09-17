import { Avatar, Flex, HStack, Image, VStack, Text } from '@chakra-ui/react';
import { useSignOut } from 'react-supabase';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/favicon.svg';

const NavBar = () => {
    const [{ error }, signOut] = useSignOut();
    const navigate = useNavigate();
    const logout = async () => {
        await signOut();
        if (error) throw error;
        navigate('/login');
    };

    return (
        <Flex
            textColor="#FFFFFF"
            justifyContent="space-between"
            paddingInline="16px"
            backgroundColor="#141414"
            width="100wh"
        >
            <HStack>
                <Image height="60px" src={logo} alt="logo" />
                <Text fontSize="24px">SpeedTyper</Text>
            </HStack>
            <HStack marginBlock="2px">
                <Avatar name="Elizabeth Olsen" />
                <VStack fontSize="14px" paddingBlock="8px">
                    <Text>Elizabeth Olsen</Text>
                    <Text color="#D9D9D9" onClick={logout}>
                        Logout
                    </Text>
                </VStack>
            </HStack>
        </Flex>
    );
};

export default NavBar;
