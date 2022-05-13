import {
  VStack,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import Container from "./Container";
import YoutubeLink from "./YouTubeLink";
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
        <Button
          borderRadius="16px"
          width={40}
          height={12}
          paddingLeft="16px"
          paddingRight="16px"
          shadow="xl"
          _focus={{ boxShadow: "none", shadow: "xl" }}
        >
          Upload
        </Button>
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