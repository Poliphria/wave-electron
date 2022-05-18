import {
  VStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import Container from "./Container";
import YoutubeLink from "./YouTubeLink";
import UploadButton from "./UploadButton"
import ColorModeSwitcher from "./ColorModeSwitcher";


export default function Home() {
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
        <UploadButton />
        <Text>
          Or
        </Text>
        <YoutubeLink />
      </VStack>
      <Flex
        justify="flex-end"
        width="100%"
        flexGrow="1"
      >
        <ColorModeSwitcher
          alignSelf="flex-end"
          mr="1rem"
          mb="1rem"
        />
      </Flex>

    </Container>
  )

}