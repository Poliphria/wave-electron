import {
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function YoutubeLink() {

  const [value, setValue] = useState(""); // variable to hold input string
  const handleChange = (event) => setValue(event.target.value);

  const handleClick = async () => {
    try {
      const isValidURL = await window.api.validateURL(value)
      isValidURL ? console.log('Valid URL') : console.log('Invalid URL')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Box>
      <InputGroup width="lg">
        <Input
          id="link"
          pr="4.5rem"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="YouTube Link"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" mr="8px" size="sm" type="submit" onClick={handleClick}>
            Submit
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}