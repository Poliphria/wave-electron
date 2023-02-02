import { Flex, Box, Accordion } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import ws from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/src/plugin/cursor';
import RegionsPlugin from 'wavesurfer.js/src/plugin/regions';
import WaveSurferOption from './WaveSurferOption';
import EQ from './EQ';
import PlayerControls from './PlayerControls';

const WS = ({ fileContents }) => {
  // player state
  const [isRefReady, setIsRefReady] = useState(false);

  // reference for container wavetable to be held in
  const waveformRef = useRef(null);

  // reference to wavesurfer object itself
  const wavesurfer = useRef(null);

  // references to channel volume nodes and filter nodes
  let eqFilters = useRef();
  let leftGainNode = useRef();
  let rightGainNode = useRef();

  // Create WaveSurfer instance
  useEffect(() => {
    /**
     * Wavesurfer options
     */
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
        RegionsPlugin.create({
          slop: 4, // mouse drag event tolerance
          maxRegions: 1,
        }),
      ],
      barWidth: 3,
      scrollParent: true,
      barHeight: 1,
      waveColor: '#A0AEC0',
      progressColor: '#4880C8',
      responsive: true,
      barGap: 2,
      barRadius: 3,
      cursorWidth: 3,
      backend: 'MediaElementWebAudio', // allows for use of html5 and WebAudio backend methods/props
    };

    wavesurfer.current = ws.create(wsOptions);

    // Create URL for file to create an audio object that can be loaded into
    // wavesurfer
    let blob = new Blob([fileContents]);
    let audio = new Audio();
    audio.src = URL.createObjectURL(blob);
    wavesurfer.current.load(audio);

    /**
     * Channel Volume Filters
     */
    const channelSplitterNode =
      wavesurfer.current.backend.ac.createChannelSplitter(2);
    const channelMergerNode =
      wavesurfer.current.backend.ac.createChannelMerger(2);
    leftGainNode.current = wavesurfer.current.backend.ac.createGain();
    rightGainNode.current = wavesurfer.current.backend.ac.createGain();

    channelSplitterNode.connect(leftGainNode.current, 0);
    leftGainNode.current.gain.value = 1;

    channelSplitterNode.connect(rightGainNode.current, 1);
    rightGainNode.current.gain.value = 1;

    leftGainNode.current.connect(channelMergerNode, 0, 0);
    rightGainNode.current.connect(channelMergerNode, 0, 1);

    /**
     * Filters
     */
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
    eqFilters.current = eqList.map(band => {
      let filter = wavesurfer.current.backend.ac.createBiquadFilter();
      filter.type = band.type;
      filter.gain.value = 0;
      filter.Q.value = 1;
      filter.frequency.value = band.f;
      return filter;
    });

    console.log(leftGainNode.current);

    wavesurfer.current.backend.setFilters([
      ...eqFilters.current, // need to spread the filters array to pass into function
      channelSplitterNode,
      leftGainNode.current,
      channelMergerNode,
    ]);

    /**
     * Wavesurfer events
     */
    wavesurfer.current.on('error', msg => {
      console.log('Error: ', msg);
    });

    wavesurfer.current.on('ready', () => {
      setIsRefReady(true);
      wavesurfer.current.enableDragSelection({
        id: 'loop-region',
        loop: true,
        color: 'hsla(0, 100%, 50%, 0.3)',
        minLength: 1,
      });
    });

    wavesurfer.current.on('region-created', region => {
      region.on('dblclick', event => {
        region.remove();
      });
      region.on('update-end', () => {
        wavesurfer.current.backend.seekTo(region.start);
        console.log('region created: ', region);
      });
    });

    wavesurfer.current.on('region-out', region => {
      region.playLoop();
    });

    // Destroy previous wavesurfer instance on change.
    return () => {
      wavesurfer.current.destroy();
    };
  }, [fileContents, waveformRef]);

  return (
    <Flex width="100%" height="100^%" alignItems="center" flexDir="column">
      <Flex width="100%" alignItems="center" justifyContent="center">
        {/* Waveform div reference */}
        <Box width="100%">
          <div ref={waveformRef} id="waveform"></div>
        </Box>
      </Flex>
      <Box width="100%" pt={8}>
        <Accordion defaultIndex={[0]} allowMultiple allowToggle>
          {/* Player Options */}
          <WaveSurferOption title="Player Controls">
            {isRefReady && (
              <PlayerControls
                leftGainNode={leftGainNode.current}
                rightGainNode={rightGainNode.current}
                wavesurferRef={wavesurfer}
              />
            )}
          </WaveSurferOption>
          {/* EQ */}
          <WaveSurferOption title="EQ">
            {isRefReady && (
              <EQ filters={eqFilters.current} wavesurferRef={wavesurfer} />
            )}
          </WaveSurferOption>
        </Accordion>
      </Box>
    </Flex>
  );
};

export default WS;
