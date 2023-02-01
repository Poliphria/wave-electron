import { Text, Flex, Box, Button } from '@chakra-ui/react';
import { useState } from 'react';
import EQSlider from './EQSlider';

const EQ = ({ filters }) => {
  const [sliderValues, setSliderValues] = useState(
    new Array(filters.length).fill(0)
  );

  console.log('slidervalues: ', sliderValues);

  const handleResetButtonClick = () => {
    filters.forEach(filter => {
      filter.gain.value = 0;
    });
    setSliderValues(new Array(filters.length).fill(0));
  };

  const handleChange = (index, value) => {
    setSliderValues(prev => {
      const sliders = [...prev];
      sliders[index] = value;
      return sliders;
    });
  };

  let filterSliders = filters.map((filter, index) => {
    return (
      <Box key={index}>
        <EQSlider
          filter={filter}
          filterIndex={index}
          handleChange={handleChange}
        />
      </Box>
    );
  });

  return (
    <Flex width="100%" justify="space-around" pt={4}>
      <Flex flexDir="column" justifyContent="space-between">
        <Button onClick={handleResetButtonClick}>Reset</Button>
        <Text flexShrink="2" alignSelf="flex-end">
          Hz
        </Text>
      </Flex>
      {filterSliders}
    </Flex>
  );
};

export default EQ;
