import { Text, Flex, Box } from '@chakra-ui/react';
import EQSlider from './EQSlider';

const EQ = ({ wavesurferRef, filters }) => {
  console.log('FROM EQ: ', wavesurferRef);

  let filterSliders = filters.map((filter, index) => {
    return (
      <Box key={index}>
        <EQSlider filter={filter} />
      </Box>
    );
  });

  return (
    <Flex width="100%" justify="space-around" pt={4}>
      <Text flexShrink="2" justifySelf="flex-start" alignSelf="flex-end">
        Hz
      </Text>
      {filterSliders}
    </Flex>
  );
};

export default EQ;
