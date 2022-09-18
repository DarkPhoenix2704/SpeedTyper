import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-supabase';
import Home from './pages/Home';
import supabase from './supabase';
import { TyperProvider } from './context/typer';

const App = () => (
    <ChakraProvider>
        <Provider value={supabase}>
            <TyperProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </TyperProvider>
        </Provider>
    </ChakraProvider>
);

export default App;
