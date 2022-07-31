import { useEffect, useState } from "react";
import {
    Text,
    Slider,
    HStack,
    VStack,
    Box,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Input,
    Button,
    Tooltip,
} from "@chakra-ui/react";
import { convertSeconds } from "../../utils/convertSeconds";

const Controls = (props) => {

    console.log(props)
    console.log(window.location.protocol)

    const [showTooltip, setShowTooltip] = useState(false)

    const handleStartNowButton = () => {
        props.setPlayerState((prev) => ({ ...prev, start: Math.floor(prev.player.getCurrentTime()) }))
    }

    const handleEndNowButton = () => {
        props.setPlayerState((prev) => ({ ...prev, end: Math.floor(prev.player.getCurrentTime()) }))
    }

    // Handles play/pause button functionality
    const handlePlayPauseClick = () => {
        if (props.isPlaying) {
            props.setPlayerState((prev) => ({ ...prev, isPlaying: false }))
            props.player.pauseVideo()
        } else {
            props.setPlayerState((prev) => ({ ...prev, isPlaying: true }))
            props.player.playVideo()
        }
    }

    // Sets the playback rate for the player when slider value changes
    const handleRateChangeEnd = (val) => {
        props.setPlayerState((prev) => ({ ...prev, speed: val }))
        props.player.setPlaybackRate(val / 100)
    }

    const sliderLabels = [25, 50, 75, 100]

    const sliderLabelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
    }

    return (
        <VStack spacing={7} height="100%" width="50%" >

            {/* Speed Slider */}
            <HStack width="80%">
                <Box width="22%">
                    <Text>Speed</Text>
                </Box>
                <Slider
                    value={props.sliderValue}
                    min={25}
                    max={100}
                    step={5}
                    onChangeEnd={(val) => handleRateChangeEnd(val)}
                    onChange={(v) => props.setPlayerState(prev => ({ ...prev, sliderValue: v }))}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <SliderTrack bg="blue.200">
                        <SliderFilledTrack bg="blue.400" />
                    </SliderTrack>

                    {/* Labels for sliders */}
                    {sliderLabels.map((label, index) => {
                        return (
                            <SliderMark key={index} value={label} {...sliderLabelStyles}>{label}%</SliderMark>
                        )
                    })}

                    <Tooltip
                        hasArrow
                        bg='blue.500'
                        color='white'
                        placement='top'
                        isOpen={showTooltip}
                        label={`${props.sliderValue}%`}
                    >
                        <SliderThumb />
                    </Tooltip>

                </Slider>
            </HStack>

            {/* Start/End Values */}
            <HStack width="80%">
                <Input value={convertSeconds(props.start)} readOnly/>
                <Button onClick={handleStartNowButton}>Now</Button>
                <Input value={convertSeconds(props.end)} readOnly/>
                <Button onClick={handleEndNowButton}>Now</Button>
            </HStack>

            {/* Play Button */}
            <HStack width="80%">
                <Button onClick={handlePlayPauseClick} width="100%">{props.isPlaying ? "Pause" : "Play"}</Button>
            </HStack>
        </VStack>
    )
}

export default Controls