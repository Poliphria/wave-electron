import Container from "../individual/Container";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import WaveSurfer from '../individual/WaveSurfer'

const FileTranscribe = (props) => {
    // Resize window on initial navigation
    useEffect(() => {
        window.resizeTo(1080, 700)
        window.api.centerWindow()
    }, [])

    const location = useLocation()
    
    // fileContents passed from UploadButton.js
    // <Buffer xyz... />
    let fileContents = location.state.fileContents
    console.log("File contents from FileTranscribe.js: ", fileContents)
    return (
        <Container p={10}>
            <WaveSurfer fileContents={fileContents} />
        </Container>
    )
}

export default FileTranscribe