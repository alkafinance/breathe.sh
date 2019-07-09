import {Box, Flex, Text} from 'fannypack'
import {useRouter} from 'next/router'
import React, {EffectCallback, useEffect, useRef, useState} from 'react'
import Lottie from 'react-lottie'
import {PageLayout} from '../components/PageLayout'

function useInterval(callback: EffectCallback, delay: number) {
  const savedCallback = useRef<EffectCallback>()

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)

      return () => clearInterval(id)
    }

    return undefined
  }, [delay])
}

const DEFAULT_DURATION_SEC = 15

interface RedirectQuery {
  to: string
}

const Redirect: React.FC = _props => {
  const [secsRemaining, setTimeRemaining] = useState(DEFAULT_DURATION_SEC)
  const [paused, setPaused] = useState(false)
  const router = useRouter()

  const {to: encodedToUrl = 'https://alka.app'} =
    (router.query as Partial<RedirectQuery> | undefined) || {}
  const toUrl = decodeURIComponent(encodedToUrl)

  useInterval(() => {
    if (paused) {
      return
    }
    if (secsRemaining === 0) {
      window.location.replace(toUrl)

      return
    }

    setTimeRemaining(secsRemaining - 1)
  }, 1000)

  useEffect(() => {
    const handleFocus = (_event: FocusEvent) => {
      setPaused(false)
    }
    const handleBlur = (_event: FocusEvent) => {
      setPaused(true)
    }

    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)

    return () => {
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [])

  return (
    <PageLayout>
      <Box marginTop="1.5rem">
        <Flex flexDirection="column" alignItems="center" padding="1.5rem">
          <Box marginTop="-4rem">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: require('../assets/seed-of-life.lottie.json'),
              }}
              height={600}
              width={600}
            />
          </Box>
          <Text fontWeight="600" marginTop="-4rem" textAlign="center">
            Redirecting to <a href={toUrl}>{toUrl}</a> in {secsRemaining}{' '}
            {secsRemaining > 1 ? 'seconds' : 'second'}
          </Text>
        </Flex>
      </Box>
    </PageLayout>
  )
}

export default Redirect
