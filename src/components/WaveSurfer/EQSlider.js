import {
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
const MAX_SLIDER_VALUE = 40;
const MIN_SLIDER_VALUE = -40;

const EQSlider = props => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleChange = value => {
    setSliderValue(value);
    props.filter.gain.value = Math.floor(value);
    console.log(
      `Current filter (${props.filter.frequency.value}) value: ${props.filter.gain.value}`
    );
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
        onChange={handleChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Text pt={2}>{props.filter.frequency.value}</Text>
    </Flex>
  );
};

export default EQSlider;
