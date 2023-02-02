import { VStack, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import Container from '../individual/Container';
import YoutubeLink from '../individual/YouTubeLink';
import UploadButton from '../individual/UploadButton';
import ColorModeSwitcher from '../individual/ColorModeSwitcher';
import '@fontsource/anton';

export default function Home() {
  const textGradient = useColorModeValue(
    'linear-gradient(to right, #ee0979, #ff6a00)',
    'linear-gradient(to right, #e96443, #904e95)'
  );
  return (
    <Container justifyContent="center" fontSize="xl">
      <VStack
        spacing="8"
        align="center"
        width="lg"
        height="lg"
        justify="center"
        flexGrow="4"
      >
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
      <Flex justify="flex-end" width="100%" flexGrow="1">
        <ColorModeSwitcher alignSelf="flex-end" mr="1rem" mb="1rem" />
      </Flex>
    </Container>
  );
}
