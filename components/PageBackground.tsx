import {Box, Image} from 'fannypack'
import React, {useState} from 'react'
import ProgressiveImage from 'react-progressive-image'
// @ts-ignore
import blackSand from '../assets/black-sand.jpg?resize&sizes[]=640&sizes[]=768&sizes[]=1024&sizes[]=1366&sizes[]=1600&sizes[]=1920'

export const PageBackground: React.FC = _props => {
  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <ProgressiveImage
      placeholder=""
      src={blackSand.src}
      srcSetData={{
        srcSet: blackSand.srcSet,
        sizes: '100vw',
      }}>
      {(
        src: string,
        loading: boolean,
        srcSetData: {srcSet: string; sizes: string},
      ) => (
        <Box position="fixed" width="100vw" height="100vh" overflow="hidden">
          <Image
            src={require('../assets/black-sand.jpg?lqip')}
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
            transform="scale(1.1)"
            transition="opacity 250ms ease"
          />
          <Box
            position="absolute"
            width="100%"
            height="100%"
            opacity={videoLoaded ? 1 : 0}
            transition="opacity 250ms ease"
            transform="scale(1.1)">
            <video
              ref={video => {
                if (video) {
                  const handleCanPlay = () => {
                    setVideoLoaded(true)
                    video.removeEventListener('canplay', handleCanPlay)
                    requestAnimationFrame(() => {
                      video.play()
                    })
                  }

                  video.addEventListener('canplay', handleCanPlay)
                  video.load()
                }
              }}
              height="100%"
              width="100%"
              style={{objectFit: 'cover'}}
              loop>
              <source
                src={require('../assets/black-sand.webm')}
                type="video/webm"
              />
              <source
                src={require('../assets/black-sand.hevc.mp4')}
                type="video/mp4; codecs=hevc"
              />
              <source
                src={require('../assets/black-sand.h264.mp4')}
                type="video/mp4; codecs=avc1.4D401E"
              />
            </video>
          </Box>
          <Box
            position="absolute"
            width="100%"
            height="100%"
            backgroundColor="rgba(0, 0, 0, 0.25)"
          />
        </Box>
      )}
    </ProgressiveImage>
  )
}
