// Button used to upload an audio file and send to '/transcribe' page
import { Box, Button } from "@chakra-ui/react";

const UploadButton = () => {

  const handleClick = () => {
    console.log('You clicked the upload button')
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

export default UploadButton;