import { Flex } from '@chakra-ui/react';
import NavBar from './NavBar';

export const Container = props => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      width="100vw"
      height="100vh"
      {...props}
    >
      <NavBar />
      {props.children}
    </Flex>
  );
};

export default Container;
