import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import Home from './components/Home'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Transcribe from './components/Transcribe'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <HashRouter>
        <Routes>
          <Route path='/transcribe' element={<Transcribe />} />
          <Route path='/' element={<Home/>} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;
