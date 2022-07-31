import {
    Flex,
} from '@chakra-ui/react'

export const Container = (props) => {

    return (
        <Flex
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            position="absolute"
            bgSize="300% 300%"
            width="100vw"
            height="100vh"
            {...props}
        />
    )
}

export default Container