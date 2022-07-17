import Container from "./Container";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import {
    Flex, HStack, VStack, Spacer, Text, Slider,
    Box,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Input,
    Button
} from "@chakra-ui/react";

const Transcribe = (props) => {
    // Resize window on navigation
    useEffect(() => {
        window.resizeTo(900, 700)
    })

    const [isPlaying, setIsPlaying] = useState(false)

    // Get videoID from URL from input from home page
    const location = useLocation()
    console.log(location.state.videoID)
    let videoID = location.state.videoID

    const playerOpt = {
        height: "200",
        width: "350",
    }


    const Controls = () => {
        return (
            <VStack spacing="16px" height="100%" width="70%" alignContent="center" >
                {/* Volume Slider */}
                <HStack width="80%" alignContent="center" justifyContent="center">
                    <Box width="22%">
                        <Text>Volume</Text>
                    </Box>

                    <Slider defaultValue={30}>
                        <SliderTrack bg='blue.200'>
                            <SliderFilledTrack bg='blue.400' />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </HStack>

                {/* Speed Slider */}
                <HStack width="80%">
                    <Box width="22%">
                        <Text>Speed</Text>
                    </Box>
                    <Slider defaultValue={100}>
                        <SliderTrack bg="blue.200">
                            <SliderFilledTrack bg="blue.400" />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </HStack>

                {/* Start/End Values */}
                <HStack width="80%">
                    <Input defaultValue="0:00" />
                    <Button margin={1}>Now</Button>
                    <Input defaultValue="4:09" />
                    <Button>Now</Button>
                </HStack>

                {/* Play Button */}
                <HStack width="80%">
                    <Button width="100%">{isPlaying ? "Pause" : "Play"}</Button>
                </HStack>
            </VStack>
        )
    }

    return (
        <Container justifyContent="center" fontSize="xl">
            <Flex padding={5} dir="row" width="100%">
                <YouTube videoId={videoID} opts={playerOpt} />
                <Spacer />
                <Controls />
            </Flex>
        </Container>
    )
}

export default Transcribe