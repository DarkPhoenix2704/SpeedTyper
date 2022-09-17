import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

const Error = () => (
    <div>
        <h1>404</h1>
        <p>Page not found</p>
    </div>
);
const App = () => (
    <ChakraProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Error />} />
            </Routes>
        </BrowserRouter>
    </ChakraProvider>
);

export default App;
