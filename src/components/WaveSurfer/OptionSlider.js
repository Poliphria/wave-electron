import {
  Flex,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

const OptionSlider = props => {
  return (
    <Flex flexDir="row" width="100%">
      <Text width="15%" pr={4}>
        {props.text}
      </Text>
      <Slider
        flexGrow="3"
        aria-label={props.ariaLabel}
        defaultValue={props.defaultValue}
        max={props.max}
        min={props.min}
        step={props.step ? props.step : 1}
      >
        {props.children}
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Flex>
  );
};

export default OptionSlider;
