import { Box, Flex } from '@chakra-ui/react';
import ColorModeSwitcher from '../individual/ColorModeSwitcher';
import HomeButton from './HomeButton';

export default function NavBar() {
  return (
    <>
      <Box mb={8} px={4} pt={2} width="100vw">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HomeButton />
          <ColorModeSwitcher />
        </Flex>
      </Box>
    </>
  );
}
