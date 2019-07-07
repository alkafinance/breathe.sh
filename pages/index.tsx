import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Input,
  List,
  Set,
  Inline,
  styled,
} from 'fannypack'
import ProgressiveImage from 'react-progressive-image'
// @ts-ignore
import blackSandScreenshot from '../assets/black-sand-screenshot.png?resize&sizes[]=640&sizes[]=768&sizes[]=1024&sizes[]=1366&sizes[]=1600&sizes[]=1920'

const StyledList = styled(List)`
  list-style: none;
  counter-reset: styled-counter;
  & li {
    counter-increment: styled-counter;
    padding-left: calc(1.75rem + 0.5rem);
    position: relative;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  & li::before {
    content: counter(styled-counter);
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.1rem 0;
    background-color: black;
    width: 1.75rem;
    text-align: center;
    border-radius: 50%;
    font-weight: 400;
  }
`

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
      <Flex
        flexDirection="column"
        justifyContent="center"
        position="absolute"
        top="0"
        left="0"
        bottom="0"
        right="0">
        <Container maxWidth="36rem">
          <Box backgroundColor="rgba(0, 0, 0, 0.75)" padding="2rem">
            <StyledList isOrdered color="textInverted">
              <List.Item>
                Enter the URL of any site that stresses you out
              </List.Item>
              <List.Item>Bookmark the redirect link</List.Item>
              <List.Item>
                Next time you visit, follow the bookmarked link
              </List.Item>
              <List.Item>
                Be greeted with a chance to stop and breathe before being
                redirected to your more stressful activities{' '}
              </List.Item>
            </StyledList>
            <Input
              a11yLabel="URL"
              type="url"
              placeholder="https://"
              defaultValue="https://"
              marginTop="2rem"
              color=""
            />
            <Set marginTop="2rem" justifyContent="flex-end">
              <Button size="medium" kind="outlined" iconAfter="link">
                Copy Link
              </Button>
              <Button size="medium" kind="outlined" iconAfter="circleRight">
                Go
              </Button>
            </Set>
          </Box>
        </Container>
      </Flex>
    </Box>
  )
}

export default Home
