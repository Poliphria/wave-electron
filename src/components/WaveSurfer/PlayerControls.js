import {
  Flex,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaStepBackward,
  FaStop,
} from 'react-icons/fa';
import WaveSurferControlButton from './WaveSurferControlButton';

const PlayerControls = ({ wavesurferRef, playerState, setPlayerState }) => {
  // Styles for slider labels
  const labelStyles = {
    mt: '6',
    fontSize: '0.8rem',
  };

  console.log('From player options: ', wavesurferRef.current);

  // Event handlers
  const handlePlayButton = event => {
    if (playerState.isPlaying) {
      wavesurferRef.current.pause();
      setPlayerState(prev => ({ ...prev, isPlaying: false }));
    } else {
      wavesurferRef.current.play();
      setPlayerState(prev => ({ ...prev, isPlaying: true }));
    }
  };

  const handleStopButton = () => {
    wavesurferRef.current.stop();
    wavesurferRef.current.seekAndCenter(0);
    setPlayerState(prev => ({ ...prev, isPlaying: false }));
  };

  const handleStepBack = () => {
    wavesurferRef.current.seekTo(0);
  };

  const handleSeekBackwards = () => {
    wavesurferRef.current.skipBackward(5);
  };

  const handleSeekForwards = () => {
    wavesurferRef.current.skipForward(5);
  };

  const handleVolumeChange = value => {
    let wsValue = value / 100;
    wavesurferRef.current.setVolume(wsValue);
  };

  return (
    <VStack p={2} width="100%" spacing={12}>
      {/* Player Control Buttons */}
      <Flex flexDir="row" pt={8} justifyContent="space-around" width="100%">
        <WaveSurferControlButton
          icon={playerState.isPlaying ? <FaPause /> : <FaPlay />}
          handleClick={handlePlayButton}
        />
        <WaveSurferControlButton
          handleClick={handleStopButton}
          icon={<FaStop />}
        />
        <WaveSurferControlButton
          handleClick={handleStepBack}
          icon={<FaStepBackward />}
        />
        <WaveSurferControlButton
          handleClick={handleSeekBackwards}
          icon={<FaBackward />}
        />
        <WaveSurferControlButton
          handleClick={handleSeekForwards}
          icon={<FaForward />}
        />
      </Flex>
      {/* Stereo Panner Slider */}
      <Flex flexDir="row" width="100%">
        <Text width="15%" pr={4}>
          Stereo Panner
        </Text>
        <Slider
          flexGrow="3"
          aria-label="stereo-panner-slider"
          defaultValue={0}
          max={100}
          min={-100}
          step={1}
        >
          <SliderMark value={-100} {...labelStyles}>
            L
          </SliderMark>
          <SliderMark value={0} {...labelStyles}>
            M
          </SliderMark>
          <SliderMark value={100} {...labelStyles}>
            R
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Flex>
      {/* Speed Slider */}
      <Flex flexDir="row" width="100%">
        <Text width="15%" pr={4}>
          Speed
        </Text>
        <Slider
          flexGrow="3"
          aria-label="stereo-panner-slider"
          defaultValue={100}
          max={100}
          min={25}
        >
          <SliderMark value={25} {...labelStyles}>
            25%
          </SliderMark>
          <SliderMark value={50} {...labelStyles}>
            50%
          </SliderMark>
          <SliderMark value={75} {...labelStyles}>
            75%
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Flex>
      {/* Volume Slider */}
      <Flex flexDir="row" width="100%">
        <Text width="15%" pr={4}>
          Volume
        </Text>
        <Slider
          flexGrow="3"
          aria-label="volume-slider"
          defaultValue={100}
          onChange={handleVolumeChange}
          max={100}
          min={0}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Flex>
      {/* Channel Volume Sliders */}
    </VStack>
  );
};

export default PlayerControls;
