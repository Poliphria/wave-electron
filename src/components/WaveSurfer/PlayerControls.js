import { Flex, SliderMark, VStack, Text } from '@chakra-ui/react';
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaStepBackward,
  FaStop,
} from 'react-icons/fa';
import WaveSurferControlButton from './WaveSurferControlButton';
import OptionSlider from './OptionSlider';
import { useState } from 'react';

const PlayerControls = ({ wavesurferRef, leftGainNode, rightGainNode }) => {
  // player state
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
  });

  const [leftVolume, setLeftVolume] = useState(100);
  const [rightVolume, setRightVolume] = useState(100);

  wavesurferRef.current.on('finish', () => {
    setPlayerState(prev => ({ ...prev, isPlaying: false }));
  });

  // Styles for slider labels
  const labelStyles = {
    mt: '6',
    ml: '-1.5',
    fontSize: 'sm',
  };

  console.log('From player options: ', wavesurferRef.current);

  // Button event handlers
  const handlePlayButton = () => {
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

  // Slider event handlers
  const handleVolumeChange = value => {
    let wsValue = value / 100;
    wavesurferRef.current.setVolume(wsValue);
  };

  const handleStereoSliderChange = value => {
    if (value < 0) {
      leftGainNode.gain.value = 1;
      setLeftVolume(Math.round(leftGainNode.gain.value * 100));
      rightGainNode.gain.value = 1 - Math.abs(value / 100);
      setRightVolume(Math.round(rightGainNode.gain.value * 100));
    } else {
      rightGainNode.gain.value = 1;
      setRightVolume(Math.round(rightGainNode.gain.value * 100));
      leftGainNode.gain.value = 1 - Math.abs(value / 100);
      setLeftVolume(Math.round(leftGainNode.gain.value * 100));
    }
    console.log('left gain value: ', leftGainNode.gain.value);
    console.log('right gain value: ', rightGainNode.gain.value);
  };

  const handleSpeedSliderChange = value => {
    wavesurferRef.current.setPlaybackRate(value / 100);
  };
  return (
    <VStack p={2} width="100%" spacing={16}>
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
      <OptionSlider
        text="Stereo Panner"
        ariaLabel="stereo-panner-slider"
        min={-100}
        max={100}
        defaultValue={0}
        handleChange={handleStereoSliderChange}
      >
        {/* Slider Marks for Stereo Panner */}
        {/* Left slider mark */}
        <SliderMark value={-100} {...labelStyles}>
          <Flex ml={-2} alignItems="center" flexDir="column">
            <Text>L</Text>
            <Text>{leftVolume}%</Text>
          </Flex>
        </SliderMark>
        <SliderMark value={0} {...labelStyles}>
          M
        </SliderMark>
        {/* Right slider mark */}
        <SliderMark value={100} {...labelStyles}>
          <Flex ml={-3} alignItems="center" flexDir="column">
            <Text>R</Text>
            <Text>{rightVolume}%</Text>
          </Flex>
        </SliderMark>
      </OptionSlider>
      ;{/* Speed Slider */}
      <OptionSlider
        text="Speed"
        ariaLabel="speed-slider"
        min={25}
        max={100}
        defaultValue={100}
        hasTooltip
        handleChange={handleSpeedSliderChange}
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
      </OptionSlider>
      {/* Volume Slider */}
      <OptionSlider
        text="Volume"
        ariaLabel="volume-slider"
        min={0}
        max={100}
        defaultValue={100}
        handleChange={handleVolumeChange}
        hasTooltip
      />
    </VStack>
  );
};

export default PlayerControls;
