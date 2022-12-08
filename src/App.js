import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import Home from './components/routes/Home'
import { HashRouter, Route, Routes } from 'react-router-dom'
import YouTubeTranscribe from './components/routes/YouTubeTranscribe'
import FileTranscribe from './components/routes/FileTranscribe';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <HashRouter>
        <Routes>
          <Route path='/transcribe/youtube' element={<YouTubeTranscribe />} />
          <Route path='/transcribe/file' element={<FileTranscribe />}/>
          <Route path='/' element={<Home/>} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;
