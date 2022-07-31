import { useState } from "react";
import YouTube from "react-youtube";
import {
    Flex,
    Box,
    Spacer
} from "@chakra-ui/react";
import Controls from '../individual/Controls'

const TranscribeControls = (props) => {
    const [playerState, setPlayerState] = useState({
        totalSeconds: 0,
        start: 0,
        end: 0,
        speed: 1,
        player: {},
        sliderValue: 100,
        isPlaying: false
    })


    const playerOpt = {
        height: "300",
        width: "100%",
    }

    // Get video information and set state variables to correct state
    // TODO: Fix insecure renderer process http warning. 
    // This is due to youtube-player package using http protocol for iframe 
    const onReady = (event) => {
        let player = event.target
        let total = player.getDuration()
        let speed = player.getPlaybackRate()
        setPlayerState(prev => ({
            ...prev,
            totalSeconds: total,
            player: player,
            end: total,
            speed: speed,
            sliderValue: speed * 100
        }))
    }

    const handlePlaybackRateChange = (event) => {
        setPlayerState(prev => ({...prev, speed: event.data, sliderValue: event.data * 100}))
    }

    // Handles state play/pause state change.
    // 0 = ended
    // 1 = playing
    // 2 = paused 
    // 3 = buffering
    // 5 = video cued
    const handleStateChange = (event) => {
        switch (event.data) {
            case 0:
                setPlayerState(prev => ({ ...prev, isPlaying: false }))
                break;
            case 1: 
            setPlayerState(prev => ({ ...prev, isPlaying: true }))
                break;
            case 2: 
            setPlayerState(prev => ({ ...prev, isPlaying: false }))
            break;
            default:
                break;
        }
    }

    return (
        <Flex direction="row">
            <Box width="45%">
                <YouTube
                    videoId={props.videoID}
                    opts={playerOpt}
                    onReady={onReady}
                    onPlaybackRateChange={handlePlaybackRateChange}
                    onStateChange={handleStateChange}
                />
            </Box>

            <Spacer />
            <Controls
                setPlayerState={setPlayerState}
                totalSeconds={playerState.totalSeconds}
                end={playerState.end}
                start={playerState.start}
                sliderValue={playerState.sliderValue}
                player={playerState.player}
                speed={playerState.speed}
                isPlaying={playerState.isPlaying}
            />

        </Flex>
    )
}

export default TranscribeControls


