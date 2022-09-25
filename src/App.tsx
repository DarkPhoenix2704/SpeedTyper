import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import { Provider } from 'react-supabase';
import supabase from './supabase';
import { TyperProvider } from './context/typer';
import Loading from './pages/Loading';

const Home = React.lazy(() => import('./pages/Home'));

const App = () => (
    <ChakraProvider>
        <Provider value={supabase}>
            <TyperProvider>
                <BrowserRouter>
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </TyperProvider>
        </Provider>
    </ChakraProvider>
);

export default App;
