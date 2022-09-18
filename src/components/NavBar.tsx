import { Flex, HStack, Image, Text, Avatar } from '@chakra-ui/react';
import { useAuthStateChange, useClient, useSignIn, useSignOut } from 'react-supabase';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import logo from '../../assets/favicon.svg';

const NavBar = () => {
    const [{ error }, signOut] = useSignOut();
    const [data, signIn] = useSignIn();
    const [userL, setUserL] = useState<User | null>(null);
    const navigate = useNavigate();
    const client = useClient();
    const logout = async () => {
        await signOut();
        if (error) throw error;
    };
    const login = async () => {
        await signIn(
            {
                provider: 'github',
            },
            {
                scopes: 'read:user',
            },
        );
        if (data.error) throw error;
        setUserL(data?.user);
    };
    useEffect(() => {
        const user = client.auth.user();
        if (user) setUserL(user);
    }, [client.auth, navigate]);

    useAuthStateChange((event, session) => {
        setUserL(session?.user ?? null);
    });
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
            <HStack marginBlock="2px" spacing="18px">
                <Text
                    fontSize="18px"
                    cursor="pointer"
                    onClick={(event) => {
                        event.preventDefault();
                        navigate('/leaderboard');
                    }}
                >
                    Leaderboard
                </Text>
                {!userL && (
                    <Text
                        fontSize="18px"
                        cursor="pointer"
                        onClick={(event) => {
                            event.preventDefault();
                            login();
                        }}
                    >
                        Login
                    </Text>
                )}
                {userL && (
                    <>
                        <Text
                            fontSize="18px"
                            cursor="pointer"
                            onClick={(event) => {
                                event.preventDefault();
                            }}
                        >
                            Profile
                        </Text>
                        <Avatar
                            size="md"
                            src={userL?.user_metadata.avatar_url}
                            name={userL?.email}
                            cursor="pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                logout();
                            }}
                        />
                    </>
                )}
            </HStack>
        </Flex>
    );
};

export default NavBar;
