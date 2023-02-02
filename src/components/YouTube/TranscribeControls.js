import { useState, useEffect, createRef, useCallback } from 'react';
import YouTube from 'react-youtube';
import { Flex, Box, Spacer } from '@chakra-ui/react';
import Controls from '../YouTube/Controls';
import { useMemo } from 'react';

const TranscribeControls = props => {
  const [playerState, setPlayerState] = useState({
    totalSeconds: 0,
    start: 0,
    end: 0,
    speed: 1,
    player: {},
    sliderValue: 100,
    isPlaying: false,
    isLooping: false,
    loopIntervalID: 0,
  });

  let looper = createRef();

  const loopVars = useMemo(
    () => ({
      isLooping: playerState.isLooping,
      loopIntervalID: playerState.loopIntervalID,
      end: playerState.end,
      start: playerState.start,
    }),
    [
      playerState.isLooping,
      playerState.loopIntervalID,
      playerState.start,
      playerState.end,
    ]
  );

  const getCurrentTime = useCallback(() => {
    return playerState.player.getCurrentTime();
  }, [playerState.player]);

  const seekTo = useCallback(
    start => {
      return playerState.player.seekTo(start, true);
    },
    [playerState.player]
  );

  useEffect(() => {
    let interval = null;
    if (loopVars.isLooping) {
      console.log('we are making loop');
      let currTime = getCurrentTime();
      // Loop function for the interval.
      const timeCountInterval = () => {
        let oldTime = currTime;
        currTime = getCurrentTime();
        if (currTime !== oldTime) {
          console.log('current time: ', currTime);
          console.log('old time: ', oldTime);
          if (currTime >= loopVars.end) {
            seekTo(loopVars.start, true);
          }
        }
      };
      interval = setInterval(timeCountInterval, 1000);
      console.log('interval: ', interval);
    } else if (!loopVars.isLooping) {
      if (interval) {
        console.log('interval exists, we are clearing');
        clearInterval(interval);
      }
    }
    return () => {
      clearInterval(interval);
    };
  }, [loopVars, looper, getCurrentTime, seekTo]);

  const playerOpt = {
    height: '300',
    width: '100%',
  };

  // Get video information and set state variables to correct state
  // TODO: Fix insecure renderer process http warning.
  // This is due to youtube-player package using http protocol for iframe
  const onReady = event => {
    let player = event.target;
    let total = player.getDuration();
    let speed = player.getPlaybackRate();
    setPlayerState(prev => ({
      ...prev,
      totalSeconds: total,
      player: player,
      end: total,
      speed: speed,
      sliderValue: speed * 100,
    }));
  };

  const handlePlaybackRateChange = event => {
    setPlayerState(prev => ({
      ...prev,
      speed: event.data,
      sliderValue: event.data * 100,
    }));
  };

  const handlePlay = () => {
    setPlayerState(prev => ({ ...prev, isPlaying: true }));
  };

  const handlePause = () => {
    setPlayerState(prev => ({ ...prev, isPlaying: false }));
  };

  const handleEnd = () => {
    setPlayerState(prev => ({ ...prev, isPlaying: true }));
  };

  return (
    <Flex direction="row">
      <Box width="45%" height="45%" pl={2}>
        <YouTube
          videoId={props.videoID}
          opts={playerOpt}
          onReady={onReady}
          onPlaybackRateChange={handlePlaybackRateChange}
          onPause={handlePause}
          onPlay={handlePlay}
          onEnd={handleEnd}
        />
      </Box>

      <Spacer />
      <Controls setPlayerState={setPlayerState} playerState={playerState} />
    </Flex>
  );
};

export default TranscribeControls;
