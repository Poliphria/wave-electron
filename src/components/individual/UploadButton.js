// Button used to upload an audio file and send to '/transcribe' page
import { Box, Button } from "@chakra-ui/react";

const UploadButton = () => {

  const handleClick = async () => {
    try {
      const filePath = await window.api.openFile() // call exposed api from preload script
      if (filePath) {
        console.log(filePath)
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