import { VStack, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import Container from '../individual/Container';
import YoutubeLink from '../individual/YouTubeLink';
import UploadButton from '../individual/UploadButton';
import { useEffect } from 'react';
import '@fontsource/anton';

export default function Home() {
  // Resize window on initial navigation
  useEffect(() => {
    window.resizeTo(800, 600);
    window.api.centerWindow();
  }, []);
  const textGradient = useColorModeValue(
    'linear-gradient(to right, #ee0979, #ff6a00)',
    'linear-gradient(to right, #e96443, #904e95)'
  );
  return (
    <Container justifyContent="center" fontSize="xl">
      <VStack spacing="8" align="center" width="lg" height="lg">
        <Text
          fontFamily="anton"
          fontSize="6rem"
          letterSpacing="0.4rem"
          bg={textGradient}
          backgroundClip="text"
        >
          WAVE
        </Text>
        <UploadButton />
        <Text>Or</Text>
        <YoutubeLink />
      </VStack>
    </Container>
  );
}
