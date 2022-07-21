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
    Button,
    Tooltip
} from "@chakra-ui/react";
import { convertSeconds } from "../utils/convertSeconds";
let videoPlayer = null

const Transcribe = (props) => {
    // Resize window on navigation
    useEffect(() => {
        window.resizeTo(1080, 700)
    })

    const [isPlaying, setIsPlaying] = useState(false)
    const [totalSeconds, setTotalSeconds] = useState(0)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState()
    const [volume, setVolume] = useState()
    const [speed, setSpeed] = useState()
    const [player, setPlayer] = useState()

    // Get videoID from URL from input from home page
    const location = useLocation()
    let videoID = location.state.videoID

    const playerOpt = {
        height: "300",
        width: "100%",
    }

    // Get video information and set state variables to correct state
    const onReady = (event) => {
        videoPlayer = event.target
        console.log(videoPlayer.getAvailablePlaybackRates())
        setTotalSeconds(videoPlayer.getDuration())
        setEnd(totalSeconds)
        setVolume(videoPlayer.getVolume())
        setSpeed(videoPlayer.getPlaybackRate())
    }

    const Controls = () => {

        const [sliderValue, setSliderValue] = useState(speed * 100)
        const [showTooltip, setShowTooltip] = useState(false)

        const handleStartNowButton = () => {
            setEnd(player.getCurrentTime())
        }

        const handleEndNowButton = () => {
            setStart(player.getCurrentTime())
        }

        const handlePlayPauseClick = () => {
            if (isPlaying) {
                setIsPlaying(false)
                videoPlayer.pauseVideo()
            } else {
                setIsPlaying(true)
                videoPlayer.playVideo()
            }
        }

        const handleRateChange = (val) => {
            setSpeed(val / 100)
            videoPlayer.setPlaybackRate(val / 100)
        }

        const sliderLabels = [0, 25, 50, 75, 100]

        const sliderLabelStyles = {
            mt: '2',
            ml: '-2.5',
            fontSize: 'sm',
        }

        return (
            <VStack spacing={8} height="100%" width="50%" >

                {/* Speed Slider */}
                <HStack width="80%">
                    <Box width="22%">
                        <Text>Speed</Text>
                    </Box>
                    <Slider
                        defaultValue={speed * 100}
                        min={25}
                        max={100}
                        step={5}
                        onChangeEnd={(val) => handleRateChange(val)}
                        onChange={(v) => setSliderValue(v)}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <SliderTrack bg="blue.200">
                            <SliderFilledTrack bg="blue.400" />
                        </SliderTrack>
                        {/* {sliderLabels.forEach((label) => {
                            return (
                                <SliderMark value={label} {...sliderLabelStyles}>{label}%</SliderMark>
                            )
                        })} */}
                        <SliderMark value={25} {...sliderLabelStyles}>
                            25%
                        </SliderMark>
                        <SliderMark value={50} {...sliderLabelStyles}>
                            50%
                        </SliderMark>
                        <SliderMark value={75} {...sliderLabelStyles}>
                            75%
                        </SliderMark>
                        <SliderMark value={100} {...sliderLabelStyles}>
                            100%
                        </SliderMark>
                        <Tooltip
                            hasArrow
                            bg='blue.500'
                            color='white'
                            placement='top'
                            isOpen={showTooltip}
                            label={`${sliderValue}%`}
                        >
                            <SliderThumb />
                        </Tooltip>

                    </Slider>
                </HStack>

                {/* Start/End Values */}
                <HStack width="80%">
                    <Input defaultValue="0:00" />
                    <Button onClick={handleStartNowButton}>Now</Button>
                    <Input defaultValue={convertSeconds(totalSeconds)} />
                    <Button onClick={handleEndNowButton}>Now</Button>
                </HStack>

                {/* Play Button */}
                <HStack width="80%">
                    <Button onClick={handlePlayPauseClick} width="100%">{isPlaying ? "Pause" : "Play"}</Button>
                </HStack>
            </VStack>
        )
    }

    return (
        <Container justifyContent="center" fontSize="xl">
            <Flex padding={5} dir="row" width="100%">
                <Box width="50%">
                    <YouTube videoId={videoID} opts={playerOpt} onReady={onReady} />
                </Box>
                <Controls />
            </Flex>
        </Container>
    )
}

export default Transcribe