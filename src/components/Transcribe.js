import Container from "./Container";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
import { convertSeconds } from "../utils/convertSeconds";

const Transcribe = (props) => {
    // Resize window on navigation
    useEffect(() => {
        window.resizeTo(900, 700)
    })

    const [isPlaying, setIsPlaying] = useState(false)
    const [totalSeconds, setTotalSeconds] = useState(0)
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [volume, setVolume] = useState()
    const [speed, setSpeed] = useState()
    let videoPlayer = null

    const videoRef = useRef()

    // Get videoID from URL from input from home page
    const location = useLocation()
    console.log(location.state.videoID)
    let videoID = location.state.videoID

    const playerOpt = {
        height: "200",
        width: "350",
    }

    // Get video information and set state variables to correct state
    const onReady = (event) => {
        videoPlayer = event.target
        setTotalSeconds(videoPlayer.getDuration())
        console.log('player: ' + videoPlayer.toString())
        setVolume(videoPlayer.getVolume())
        setSpeed(videoPlayer.getPlaybackRate() * 100)
        setEnd(videoPlayer.getDuration())
    }

    const handlePause = () => {
        setIsPlaying(false)
    }

    const handlePlay = () => {
        setIsPlaying(true)
    }

    const handlePlayButtonClick = () => {
        isPlaying ? videoPlayer.pauseVideo() : videoPlayer.playVideo()
    }

    const Controls = () => {
        return (
            <VStack spacing="16px" height="100%" width="70%" alignContent="center" >
                {/* Volume Slider */}
                <HStack width="80%" alignContent="center" justifyContent="center">
                    <Box width="22%">
                        <Text>Volume</Text>
                    </Box>

                    <Slider defaultValue={volume}>
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
                    <Slider defaultValue={speed}>
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
                    <Input defaultValue={convertSeconds(totalSeconds)} />
                    <Button>Now</Button>
                </HStack>

                {/* Play Button */}
                <HStack width="80%">
                    <Button onClick={handlePlayButtonClick} width="100%">{isPlaying ? "Pause" : "Play"}</Button>
                </HStack>
            </VStack>
        )
    }

    return (
        <Container justifyContent="center" fontSize="xl">
            <Flex padding={5} dir="row" width="100%">
                <YouTube onPause={handlePause} onPlay={handlePlay} ref={videoRef} videoId={videoID} opts={playerOpt} onReady={onReady} />
                <Spacer />
                <Controls />
            </Flex>
        </Container>
    )
}

export default Transcribe