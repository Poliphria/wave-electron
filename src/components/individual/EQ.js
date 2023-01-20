import {
  Text,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

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
    const handleChange = () => {};
    return (
      <Slider>
        <Slider
          aria-label="slider-ex-3"
          defaultValue={30}
          orientation="vertical"
          minH="32"
          key={index}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Slider>
    );
  });

  return (
    <Flex width="100%" justify="space-around">
      <Text width={10} p={2} alignSelf="self-end">
        Hz
      </Text>
      {filterSliders}
    </Flex>
  );
};

export default EQ;
