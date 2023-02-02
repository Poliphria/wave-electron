import Container from '../individual/Container';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import TranscribeControls from '../YouTube/TranscribeControls';

const YouTube = props => {
  // Resize window on navigation
  useEffect(() => {
    window.resizeTo(1080, 700);
    window.api.centerWindow();
  }, []);

  // Get videoID from URL from input from home page
  const location = useLocation();
  let videoID = location.state.videoID;

  return (
    <Container fontSize="xl">
      <Flex
        px={10}
        direction="row"
        width="100%"
        height="100%"
        alignItems="center"
        mb={100}
      >
        <Box width="100%">
          <TranscribeControls videoID={videoID} />
        </Box>
      </Flex>
    </Container>
  );
};

export default YouTube;
