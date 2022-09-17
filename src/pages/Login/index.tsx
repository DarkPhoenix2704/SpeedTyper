import { Flex, Input, Heading, Box, Button, CircularProgress } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-supabase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [{ fetching }, signIn] = useSignIn();

    const navigate = useNavigate();
    const signup = async () => {
        navigate('/signup');
    };
    const login = async () => {
        const { user } = await signIn({
            email,
            password,
        });

        if (user) {
            navigate('/');
        }
        setIsInvalid(true);
    };
    return (
        <Flex height="100vh" justifyContent="center" alignItems="center" bg="#141414" color="#fff">
            {fetching && <CircularProgress isIndeterminate color="#2CCBFE" />}
            {!fetching && (
                <Box textAlign="center" bg="#282828" padding="36px" borderRadius="5px">
                    <Heading>Login</Heading>
                    <Input
                        isInvalid={isInvalid}
                        placeholder="Email"
                        size="lg"
                        marginBlock="10px"
                        onChange={(event) => setEmail(event.target.value)}
                        _placeholder={{ color: '#D9D9D9' }}
                    />
                    <Input
                        isInvalid={isInvalid}
                        placeholder="Password"
                        size="lg"
                        marginBlock="10px"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        _placeholder={{ color: '#D9D9D9' }}
                    />
                    <Button
                        width="100%"
                        size="lg"
                        color="#282828"
                        marginBlock="10px"
                        onClick={login}
                    >
                        Login
                    </Button>
                    <Button
                        width="100%"
                        size="lg"
                        marginBlock="10px"
                        color="#282828"
                        onClick={signup}
                    >
                        SignUp
                    </Button>
                </Box>
            )}
        </Flex>
    );
};

export default Login;
