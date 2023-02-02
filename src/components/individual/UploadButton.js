// Button used to upload an audio file and send to '/transcribe' page
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const UploadButton = () => {
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      const fileContents = await window.api.openFile() // call exposed api from preload script
      if (fileContents) {
        console.log("blpb in renderer: ", fileContents)
        navigate('/transcribe/file', {
          state: {
            fileContents: fileContents
          }
        })
      }
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <Box>
        <Button
          borderRadius="16px"
          onClick={handleClick}
          width={40}
          height={12}
          paddingLeft="16px"
          paddingRight="16px"
          shadow="xl"
          _focus={{ boxShadow: "none", shadow: "xl" }}
        >
          Upload
        </Button>
    </Box>
  );
};

/* ipcRenderer.on('selected-file', (event, file) => {
  console.log('File information: \n', file)
}) */

export default UploadButton;