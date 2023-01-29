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

const OptionSlider = ({
  defaultValue,
  handleChange,
  ariaLabel,
  children,
  text,
  max,
  min,
  step = 1,
  ...props
}) => {
  const [sliderValue, setSliderValue] = useState(defaultValue);
  const [showTooltip, setShowTooltip] = useState(false);

  const customChange = value => {
    setSliderValue(value);
    handleChange(value);
  };

  return (
    <Flex flexDir="row" width="100%">
      <Text width="15%" pr={4}>
        {text}
      </Text>
      <Slider
        flexGrow="3"
        aria-label={ariaLabel}
        defaultValue={defaultValue}
        max={max}
        min={min}
        step={step ? step : 1}
        onChange={customChange}
        onMouseEnter={props.hasTooltip ? () => setShowTooltip(true) : null}
        onMouseLeave={props.hasTooltip ? () => setShowTooltip(false) : null}
      >
        {children}
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        {props.hasTooltip ? (
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
        ) : (
          <SliderThumb />
        )}
      </Slider>
    </Flex>
  );
};

export default OptionSlider;
