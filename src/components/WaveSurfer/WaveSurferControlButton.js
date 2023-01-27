import { IconButton } from '@chakra-ui/react';

const WaveSurferControlButton = ({ icon, handleClick }) => {
  let buttonStyles = {
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
    size: 'lg',
  };
  return <IconButton {...buttonStyles} icon={icon} onClick={handleClick} />;
};

export default WaveSurferControlButton;
