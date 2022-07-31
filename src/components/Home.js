import {
  VStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import Container from "./individual/Container";
import YoutubeLink from "./individual/YouTubeLink";
import UploadButton from "./individual/UploadButton"
import ColorModeSwitcher from "./individual/ColorModeSwitcher";


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