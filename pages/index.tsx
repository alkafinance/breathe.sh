import {Box, Container, Image} from 'fannypack'
import ProgressiveImage from 'react-progressive-image'
// @ts-ignore
import blackSandScreenshot from '../assets/black-sand-screenshot.png?resize&sizes[]=640&sizes[]=768&sizes[]=1024&sizes[]=1366&sizes[]=1600&sizes[]=1920'

const Home: React.FC = _props => {
  return (
    <Box overflow="hidden">
      <ProgressiveImage
        placeholder=""
        src={blackSandScreenshot.src}
        srcSetData={{
          srcSet: blackSandScreenshot.srcSet,
          sizes: '100vw',
        }}>
        {(
          src: string,
          loading: boolean,
          srcSetData: {srcSet: string; sizes: string},
        ) => (
          <Box position="fixed" width="100vw" height="100vh" overflow="hidden">
            <Image
              src={require('../assets/black-sand-screenshot.png?lqip')}
              fit="cover"
              position="absolute"
              width="100%"
              height="100%"
              filter="blur(25px)"
              transform="scale(1.2)"
            />
            <Image
              src={src}
              srcSet={srcSetData.srcSet}
              sizes={srcSetData.sizes}
              fit="cover"
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
