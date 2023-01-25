import { Flex, IconButton, Box, Accordion } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import ws from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/src/plugin/cursor';
import WaveSurferOption from './WaveSurferOption';
import EQ from './EQ';
import PlayerOptions from './PlayerOptions';

const WS = ({ fileContents }) => {
  // player state
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    isRefReady: false,
  });

  // reference for container wavetable to be held in
  const waveformRef = useRef(null);

  // reference to wavesurfer object itself
  const wavesurfer = useRef(null);

  useEffect(() => {
    // wavesurfer options
    let wsOptions = {
      container: waveformRef.current,
      plugins: [
        CursorPlugin.create({
          showTime: true,
          opacity: 1,
          customShowTimeStyle: {
            'background-color': '#000',
            color: '#fff',
            padding: '2px',
            'font-size': '12px',
          },
        }),
      ],
      barWidth: 3,
      scrollParent: true,
      barHeight: 1,
      waveColor: '#ddd',
      responsive: true,
      barGap: 2,
      barRadius: 3,
      cursorWidth: 3,
      backend: 'MediaElementWebAudio',
    };

    wavesurfer.current = ws.create(wsOptions);

    // Create URL for file to create an audio object that can be loaded into
    // wavesurfer
    let blob = new Blob([fileContents]);
    let audio = new Audio();
    audio.src = URL.createObjectURL(blob);
    wavesurfer.current.load(audio);
    wavesurfer.current.on('finish', () => {
      setPlayerState(prev => ({ ...prev, isPlaying: false }));
    });

    wavesurfer.current.on('error', msg => {
      console.log('Error: ', msg);
    });

    wavesurfer.current.on('ready', () => {
      console.log('WS: ', wavesurfer.current);
      setPlayerState(prev => ({ ...prev, isRefReady: true }));
    });

    // Destroy previous wavesurfer instance on change.
    return () => {
      wavesurfer.current.destroy();
    };
  }, [fileContents, waveformRef]);

  // Click event function pauses/plays wavesurfer player
  const handleClick = event => {
    if (playerState.isPlaying) {
      wavesurfer.current.pause();
      setPlayerState(prev => ({ ...prev, isPlaying: false }));
    } else {
      wavesurfer.current.play();
      setPlayerState(prev => ({ ...prev, isPlaying: true }));
    }
  };

  return (
    <Flex width="100%" height="100^%" alignItems="center" flexDir="column">
      <Flex width="100%" alignItems="center" justifyContent="center">
        {/* Play/Pause Button */}
        <IconButton
          borderRadius="70%"
          icon={playerState.isPlaying ? <FaPause /> : <FaPlay />}
          onClick={handleClick}
          size="lg"
          mr={8}
        />
        {/* Waveform div reference */}
        <Box width="100%">
          <div ref={waveformRef} id="waveform"></div>
        </Box>
      </Flex>
      <Box width="100%" pt={8}>
        <Accordion allowMultiple allowToggle>
          <WaveSurferOption title="Player Controls">
            {playerState.isRefReady && (
              <PlayerOptions
                setPlayerState={setPlayerState}
                state={playerState}
                wavesurferRef={wavesurfer}
              />
            )}
          </WaveSurferOption>
          <WaveSurferOption title="EQ">
            {playerState.isRefReady && <EQ wavesurferRef={wavesurfer} />}
          </WaveSurferOption>
        </Accordion>
      </Box>
    </Flex>
  );
};

export default WS;
