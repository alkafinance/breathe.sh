import {Flex, Image} from 'fannypack'
import React from 'react'
import ProgressiveImage from 'react-progressive-image'
// @ts-ignore
import blackSand from '../../assets/black-sand.jpg?resize&sizes[]=640&sizes[]=768&sizes[]=1024&sizes[]=1366&sizes[]=1600&sizes[]=1920' // eslint-disable-line import/no-unresolved

export const PageBackground = React.memo(_props => {
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
        <Flex width="100vw" height="100vh" overflow="hidden">
          <Image
            // eslint-disable-next-line import/no-unresolved
            src={require('../../assets/black-sand.jpg?lqip')}
            alt="Black Sand"
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
            alt="Black Sand"
            fit="cover"
            position="absolute"
            width="100%"
            height="100%"
            opacity={loading ? 0 : 1}
            transform="scale(1.1)"
            transition="opacity 250ms ease"
          />
          <Flex
            position="absolute"
            width="100%"
            height="100%"
            transform="scale(1.1)">
            <video
              height="100%"
              width="100%"
              style={{objectFit: 'cover'}}
              autoPlay
              muted
              loop>
              <source
                src={require('../../assets/black-sand.webm')}
                type="video/webm"
              />
              <source
                src={require('../../assets/black-sand.hevc.mp4')}
                type="video/mp4; codecs=hevc"
              />
              <source
                src={require('../../assets/black-sand.h264.mp4')}
                type="video/mp4; codecs=avc1.4D401E"
              />
            </video>
          </Flex>
          <Flex
            position="absolute"
            width="100%"
            height="100%"
            backgroundColor="rgba(0, 0, 0, 0.25)"
          />
        </Flex>
      )}
    </ProgressiveImage>
  )
})
