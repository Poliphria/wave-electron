import { extendTheme } from "@chakra-ui/react"

const config = {
  initialColorMode: 'system', 
  useSystemColorMode: true,
  fonts: {
      heading: 'Open sans, sans-serif',
      body: 'Roboto, sans-serif'
  }
}

const theme = extendTheme({
  ...config,
})

export default theme