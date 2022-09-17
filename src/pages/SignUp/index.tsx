import { Flex, Input, Heading, Box, Button, CircularProgress } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from 'react-supabase';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [{ error, fetching }, signUp] = useSignUp();
    const navigate = useNavigate();
    const login = async () => {
        navigate('/login');
    };
    const signup = async () => {
        const { user } = await signUp({
            email,
            password,
        });
        if (error) {
            setIsInvalid(true);
        }
        if (user) {
            console.log(user);

            localStorage.setItem('authId', String(user));
            setIsInvalid(false);
            navigate('/');
        }
    };
    return (
        <Flex height="100vh" justifyContent="center" alignItems="center" bg="#141414" color="#fff">
            {fetching && <CircularProgress isIndeterminate color="#2CCBFE" />}
            {!fetching && (
                <Box textAlign="center" bg="#282828" padding="36px" borderRadius="5px">
                    <Heading>SignUp</Heading>
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
                        marginBlock="10px"
                        color="#282828"
                        onClick={signup}
                    >
                        SignUp
                    </Button>
                    <Button
                        width="100%"
                        size="lg"
                        marginBlock="10px"
                        color="#282828"
                        onClick={login}
                    >
                        Login
                    </Button>
                </Box>
            )}
        </Flex>
    );
};

export default SignUp;
