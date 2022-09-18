import { Avatar, Flex, HStack, Image, VStack, Text } from '@chakra-ui/react';
import { useSignOut } from 'react-supabase';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import logo from '../../assets/favicon.svg';

const NavBar = () => {
    const [{ error }, signOut] = useSignOut();
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const logout = async () => {
        await signOut();
        localStorage.removeItem('user');
        if (error) throw error;
        navigate('/login');
    };

    useEffect(() => {
        const locUser = localStorage.getItem('user');
        if (!locUser) navigate('/login');
        setUser(JSON.parse(localStorage.getItem('user')));
    }, []);

    return (
        <Flex
            textColor="#FFFFFF"
            justifyContent="space-between"
            paddingInline="16px"
            backgroundColor="#141414"
            width="100vw"
        >
            <HStack>
                <Image height="60px" src={logo} alt="logo" />
                <Text fontSize="24px">SpeedTyper</Text>
            </HStack>
            <HStack marginBlock="2px">
                <Avatar name={user?.email} />
                <VStack fontSize="14px" paddingBlock="8px">
                    <Text>{user?.email}</Text>
                    <Text color="#D9D9D9" onClick={logout}>
                        Logout
                    </Text>
                </VStack>
            </HStack>
        </Flex>
    );
};

export default NavBar;
