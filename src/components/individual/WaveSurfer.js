import { Flex, IconButton, Text } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { FaPlay } from "react-icons/fa"
import ws from "wavesurfer.js"


const WaveSurfer = ({ fileContents }) => {
    // player state
    const [playerState, setPlayerState] = useState({
        isPlaying: false
    })

    // reference for container wavetable to be held in
    const waveformRef = useRef(null)

    // reference to wavesurfer object itself
    const wavesurfer = useRef(null)
    console.log("ws contents: ", fileContents)

    useEffect(() => {
        // wavesurfer options
        let wsOptions = {
            container: waveformRef.current,
            backend: 'MediaElement',
            barWidth: 2,
            barHeight: 1,
            barGap: 2,
            barRadius: 3,
            cursorWidth: 3,
            scrollParent: true,
        }

        wavesurfer.current = ws.create(wsOptions)

        // convert file contents to blob. ArrayBuffer (UINT8) to Blob
        // const audioBlob = new Blob([new Uint8Array(fileContents)])

        // create an object audio object and create URL from that
        // use this URL to load it into WaveSurfer
        // console.log("This is supposed to be a blob: ", audioBlob)
        // let audio = new Audio()
        // audio.src = URL.createObjectURL(fileContents)
        // console.log("Audio object: ", audio)
        
        console.log(" This is the current file contents as an ArrayBuffer: ", fileContents)
        let blob = new Blob([fileContents])
        let audio = new Audio()
        audio.src = URL.createObjectURL(blob)
        console.log('This is the audio js object: ', audio)
        console.log('This is the blob: ', blob)

        wavesurfer.current.load(audio)
        console.log("wavesurfer object: ", wavesurfer.current)

        return () => {
            wavesurfer.current.destroy()
        }
    }, [fileContents])

    // Click event function pauses/plays wavesurfer player
    const handleClick = (event) => {
        if (playerState.isPlaying) {
            wavesurfer.current.pause()
            setPlayerState(prev => ({...prev, isPlaying: false}))
        } else {
            wavesurfer.current.play()
            setPlayerState(prev => ({...prev, isPlaying: true}))
        }
    }

    return (
        <Flex direction="row" justify="center" alignItems="center" width="100%">
            <IconButton icon={<FaPlay />} onClick={handleClick}/>
            <div ref={waveformRef} height="100%" width="90%" />
            <Text>Test</Text>
        </Flex>
    )
}

export default WaveSurfer