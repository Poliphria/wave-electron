import {
  Input,
  Button,
  InputGroup,
  InputRightElement,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { matchYouTubeURL, getYouTubeID } from '../../utils/matchYouTubeURL';

export default function YoutubeLink() {
  let navigate = useNavigate(); // navigation function for react router

  return (
    <Formik
      initialValues={{
        link: '',
      }}
      onSubmit={values => {
        console.log(values);
        navigate('/transcribe/youtube', {
          state: {
            videoID: getYouTubeID(values.link),
          },
        });
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ handleSubmit, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <FormControl isInvalid={!!errors.link && touched.link}>
            <InputGroup width="lg">
              <Field
                as={Input}
                id="link"
                name="link"
                type="text"
                pr="4.5rem"
                placeholder="YouTube Link"
                validate={value => {
                  console.log('value: ', value);
                  let error;
                  if (!value) {
                    error = 'This is required.';
                  } else if (!matchYouTubeURL(value)) {
                    error = 'Invalid YouTube Link';
                  }

                  return error;
                }}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" mr="8px" size="sm" type="submit">
                  Submit
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.link}</FormErrorMessage>
          </FormControl>
        </form>
      )}
    </Formik>
  );
}
