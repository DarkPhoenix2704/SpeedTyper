import { Flex, HStack, Image, Text, Avatar, useDisclosure, Tooltip } from '@chakra-ui/react';
import { useAuthStateChange, useClient, useSignIn, useSignOut } from 'react-supabase';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import logo from '../../assets/favicon.svg';

const ProfileModal = React.lazy(() => import('../modal/Profile'));
const LeaderboardModal = React.lazy(() => import('../modal/Leaderboard'));
const NavBar = () => {
    const [{ error }, signOut] = useSignOut();
    const [, signIn] = useSignIn();
    const [userL, setUserL] = useState<User | null | undefined>(null);
    const navigate = useNavigate();
    const {
        isOpen: isOpenProfileModal,
        onOpen: onOpenProfileModal,
        onClose: onCloseProfileModal,
    } = useDisclosure();
    const {
        isOpen: isOpenLeaderboardModal,
        onOpen: onOpenLeaderboardModal,
        onClose: onCloseLeaderboardModal,
    } = useDisclosure();
    const client = useClient();
    const logout = async () => {
        await signOut();
        if (error) throw error;
    };
    const login = async () => {
        const signInData = await signIn(
            {
                provider: 'github',
            },
            {
                scopes: 'read:user',
            },
        );
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        if (signInData.error) throw error;
        setUserL(signInData?.user);
    };
    useEffect(() => {
        const user = client.auth.user();
        if (user) setUserL(user);
    }, [client.auth, navigate]);

    useAuthStateChange((event, session) => {
        setUserL(session?.user ?? null);
    });
    return (
        <>
            <ProfileModal isOpen={isOpenProfileModal} onClose={onCloseProfileModal} />
            <LeaderboardModal isOpen={isOpenLeaderboardModal} onClose={onCloseLeaderboardModal} />
            <Flex
                textColor="#FFFFFF"
                justifyContent="space-between"
                paddingInline="16px"
                width={{ base: 'full', lg: 'container.xl' }}
                backgroundColor="#141414"
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
                            onOpenLeaderboardModal();
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
                                    onOpenProfileModal();
                                }}
                            >
                                Profile
                            </Text>
                            <Tooltip label="Signout">
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
                            </Tooltip>
                        </>
                    )}
                </HStack>
            </Flex>
        </>
    );
};

export default NavBar;
