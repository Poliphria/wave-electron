import {
  AccordionItem,
  Box,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';

const WaveSurferOption = props => {
  return (
    <Box>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box
              fontSize="lg"
              as="span"
              flex="1"
              fontWeight="bold"
              textAlign="left"
            >
              {props.title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>{props.children}</AccordionPanel>
      </AccordionItem>
    </Box>
  );
};

export default WaveSurferOption;
