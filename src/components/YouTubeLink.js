import {
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Box,
  FormControl,
  FormErrorMessage
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function YoutubeLink() {

  const [value, setValue] = useState(""); // variable to hold input string
  const handleChange = (event) => setValue(event.target.value);


  const {
    handleSubmit, //takes as input onSubmit
    register, // function used to link an input to form state
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    console.log('Link works!')
  }

  return (
    <Box>
      <FormControl isInvalid={errors.link}>
        <InputGroup width="lg">
          <Input
            id="link"
            {...register("link", {
              required: "This is required",
              validate: async (link) =>
                await window.api.validateURL(link) || "Invalid YouTube Link", // react-hook-form validation needs to be a function and then or'd with err msg
            })}
            pr="4.5rem"
            type="text"
            value={value}
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