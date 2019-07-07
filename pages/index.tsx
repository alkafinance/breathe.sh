import {Box, Container, Image} from 'fannypack'
import ProgressiveImage from 'react-progressive-image'

const Home: React.FC = _props => {
  return (
    <Box overflow="hidden">
      <ProgressiveImage
        placeholder=""
        src={require('../assets/black-sand-screenshot.png')}>
        {(src: string, loading: boolean) => (
          <Box position="fixed" width="100vw" height="100vh">
            <Image
              src={require('../assets/black-sand-screenshot.png?lqip')}
              position="absolute"
              width="100%"
              height="100%"
              filter="blur(25px)"
              transform="scale(1.1)"
            />
            <Image
              src={src}
              position="absolute"
              width="100%"
              height="100%"
              opacity={loading ? 0 : 1}
              transition="opacity 250ms ease"
            />
          </Box>
        )}
      </ProgressiveImage>
      <Container top="2rem" left="0" right="0" position="absolute">
        <Box backgroundColor="whitesmoke" padding="0.5rem">
          Hello world!
        </Box>
      </Container>
    </Box>
  )
}

export default Home
