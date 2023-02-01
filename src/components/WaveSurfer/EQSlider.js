import {
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from '@chakra-ui/react';
const MAX_SLIDER_VALUE = 40;
const MIN_SLIDER_VALUE = -40;

const EQSlider = ({ filter, handleChange, filterIndex }) => {
  const customChange = value => {
    filter.gain.value = Math.round(value);
    handleChange(filterIndex, value);
  };
  return (
    <Flex flexDir="column">
      <Slider
        aria-label="eq-slider"
        defaultValue={0}
        orientation="vertical"
        minH="48"
        max={MAX_SLIDER_VALUE}
        min={MIN_SLIDER_VALUE}
        onChange={customChange}
        value={filter.gain.value}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Text pt={2}>{filter.frequency.value}</Text>
    </Flex>
  );
};

export default EQSlider;
