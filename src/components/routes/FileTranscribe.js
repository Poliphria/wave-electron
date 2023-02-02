import Container from '../individual/Container';
import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ColorModeSwitcher from '../individual/ColorModeSwitcher';
import WaveSurfer from '../WaveSurfer/WaveSurfer';

const FileTranscribe = props => {
  // Resize window on initial navigation
  useEffect(() => {
    window.resizeTo(1080, 700);
    window.api.centerWindow();
  }, []);

  const location = useLocation();

  // fileContents passed from UploadButton.js
  // <Buffer xyz... />
  let fileContents = location.state.fileContents;
  console.log('File contents from FileTranscribe.js: ', fileContents);
  return (
    <Container p={16}>
      <WaveSurfer pt={2} fileContents={fileContents} />
      <Flex justify="flex-end" width="100%" flexGrow="1" mr="-100" mb="-42">
        <ColorModeSwitcher alignSelf="flex-end" mr="1rem" mb="1rem" />
      </Flex>
    </Container>
  );
};

export default FileTranscribe;
