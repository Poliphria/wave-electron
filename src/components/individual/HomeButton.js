import { IconButton } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HomeButton = props => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`home-button`}
      color="current"
      marginLeft="2"
      onClick={handleClick}
      icon={<FaHome />}
      {...props}
    />
  );
};

export default HomeButton;
