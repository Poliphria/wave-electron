import {
  Flex,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
} from '@chakra-ui/react';

import { useState } from 'react';

const OptionSlider = props => {
  const [sliderValue, setSliderValue] = useState(props.defaultValue);
  const [showTooltip, setShowTooltip] = useState(false);

  // const handleChange = value => {
  //   setSliderValue(value);
  //   props.handleChange(value);
  // };

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
        // onChange={handleChange}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {props.children}
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg="#4880C8"
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={`${sliderValue}%`}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </Flex>
  );
};

export default OptionSlider;
