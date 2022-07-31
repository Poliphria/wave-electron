import {
  Input,
  Button,
  InputGroup,
  InputRightElement,
  FormControl,
  FormErrorMessage,
  Box
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { matchYouTubeURL, getYouTubeID } from "../../utils/matchYouTubeURL";

export default function YoutubeLink() {
  let navigate = useNavigate() // navigation function for react router

  const [link, setLink] = useState(""); // variable to hold input string
  const handleChange = (event) => setLink(event.target.value);


  const {
    handleSubmit, //takes as input onSubmit
    register, // function used to link an input to form state
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    navigate('/transcribe', {
      state: {
        videoID: getYouTubeID(link)
      }
    })
  }

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('enter key pressed.')
      e.preventDefault()
      handleSubmit(onSubmit)()
    }
  }


  return (
    <Box>
      <FormControl isInvalid={errors.link}>
        <InputGroup width="lg">
          <Input
            id="link"
            {...register("link", {
              required: "This is required",
              validate: (link) => matchYouTubeURL(link) || "Invalid YouTube Link", // react-hook-form validation needs to be a function and then or'd with err msg
            })}
            pr="4.5rem"
            type="text"
            value={link}
            onKeyDown={handleInputKeyDown}
            onChange={handleChange}
            placeholder="YouTube Link"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" mr="8px" size="sm" type="submit" onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>
          {errors.link && errors.link.message}
        </FormErrorMessage>
      </FormControl>
    </Box>
  );
}