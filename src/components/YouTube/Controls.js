import { useState } from "react";
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
    Switch,
} from "@chakra-ui/react";
import { convertSeconds } from "../../utils/convertSeconds";

const Controls = ({ setPlayerState, playerState }) => {
    const [showTooltip, setShowTooltip] = useState(false)
    console.log(playerState)

    const handleStartNowButton = () => {
        // Check if start is going to be greater than end
        let now = playerState.player.getCurrentTime()
        if (now > playerState.end) {
            return 
        }
        setPlayerState((prev) => ({ ...prev, start: Math.floor(prev.player.getCurrentTime()) }))
    }

    const handleEndNowButton = () => {
        setPlayerState((prev) => ({ ...prev, end: Math.floor(prev.player.getCurrentTime()) }))
    }

    // Handles play/pause button functionality
    const handlePlayPauseClick = () => {
        if (playerState.isPlaying) {
            setPlayerState((prev) => ({ ...prev, isPlaying: false }))
            playerState.player.pauseVideo()
        } else {
            setPlayerState((prev) => ({ ...prev, isPlaying: true }))
            playerState.player.playVideo()
        }
    }

    // Sets the playback rate for the player when slider value changes
    const handleRateChangeEnd = (val) => {
        setPlayerState((prev) => ({ ...prev, speed: val }))
        playerState.player.setPlaybackRate(val / 100)
    }

    // Handles switch looping state
    const handleSwitchChange = (event) => {
        console.log('Switch clicked currently: ', event.target.checked)
        setPlayerState((prev) => ({ ...prev, isLooping: event.target.checked }))
    }

    const handlePlayLoopClick = () => {
        playerState.player.seekTo(playerState.start, true)
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
                    value={playerState.sliderValue}
                    min={25}
                    max={100}
                    step={5}
                    onChangeEnd={(val) => handleRateChangeEnd(val)}
                    onChange={(v) => setPlayerState(prev => ({ ...prev, sliderValue: v }))}
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
                        label={`${playerState.sliderValue}%`}
                    >
                        <SliderThumb />
                    </Tooltip>

                </Slider>
            </HStack>

            {/* Start/End Values */}
            <HStack width="80%">
                <Text>Loop:</Text>
                <Switch id="loop" onChange={handleSwitchChange} />
                <Input value={convertSeconds(playerState.start)} readOnly /> {/* Start Button */}
                <Button onClick={handleStartNowButton}>Now</Button>
                <Input value={convertSeconds(playerState.end)} readOnly /> {/* End Button */}
                <Button onClick={handleEndNowButton}>Now</Button>
            </HStack>

            {/* Play Buttons */}
            <HStack width="80%">
                <Button onClick={handlePlayLoopClick} width="30%">Loop Start</Button>
                <Button onClick={handlePlayPauseClick} width="100%">{playerState.isPlaying ? "Pause" : "Play"}</Button>
            </HStack>
        </VStack>
    )
}

export default Controls