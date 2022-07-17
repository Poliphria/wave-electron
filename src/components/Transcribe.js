import Container from "./Container";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import YouTube from "react-youtube";
import { Flex, Spacer, Text } from "@chakra-ui/react";

const Transcribe = (props) => {
    useEffect(() => {
        window.resizeTo(1000, 800)
    })


    const location = useLocation()
    console.log(location.state.videoID)
    let videoID = location.state.videoID

    const playerOpt = {
        height: "200",
        width: "350",
    }


    const Controls = () => {
        return (
            <Text>test</Text>
        )
    }

    return (
        <Container justifyContent="center" fontSize="xl">
            <Flex dir="row" justifyContent="space-between" height="0.3rem">
                <YouTube videoId={videoID} opts={playerOpt} />
                <Controls />
            </Flex>
        </Container>
    )
}

export default Transcribe