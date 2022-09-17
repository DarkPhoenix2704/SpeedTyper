import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-supabase';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import supabase from './supabase';

const App = () => (
    <ChakraProvider>
        <Provider value={supabase}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </ChakraProvider>
);

export default App;
