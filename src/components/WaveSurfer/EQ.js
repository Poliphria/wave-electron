import { Text, Flex, Box } from '@chakra-ui/react';
import EQSlider from './EQSlider';

const EQ = ({ wavesurferRef }) => {
  console.log('FROM EQ: ', wavesurferRef);
  let eqList = [
    {
      f: 32,
      type: 'lowshelf',
    },
    {
      f: 64,
      type: 'peaking',
    },
    {
      f: 125,
      type: 'peaking',
    },
    {
      f: 250,
      type: 'peaking',
    },
    {
      f: 500,
      type: 'peaking',
    },
    {
      f: 1000,
      type: 'peaking',
    },
    {
      f: 2000,
      type: 'peaking',
    },
    {
      f: 4000,
      type: 'peaking',
    },
    {
      f: 8000,
      type: 'peaking',
    },
    {
      f: 16000,
      type: 'highshelf',
    },
  ];
  const filters = eqList.map(band => {
    let filter = wavesurferRef.current.backend.ac.createBiquadFilter();
    filter.type = band.type;
    filter.gain.value = 0;
    filter.Q.value = 1;
    filter.frequency.value = band.f;
    return filter;
  });

  // connect filters to backend
  wavesurferRef.current.backend.setFilters(filters);

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
