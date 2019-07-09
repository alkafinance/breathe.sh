import {Flex, Text} from 'fannypack'
import {useRouter} from 'next/router'
import React, {EffectCallback, useEffect, useRef, useState} from 'react'
import Lottie from 'react-lottie'
import {PageLayout} from '../components/PageLayout'

const useInterval = (callback: EffectCallback, delay: number) => {
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
      <Flex flexDirection="column" padding="1.5rem" marginTop="1.5rem">
        <Flex flexDirection="column" alignItems="center" transform="scale(1.2)">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: require('../assets/seed-of-life.lottie.json'),
            }}
            width="100%"
            height="auto"
          />
        </Flex>
        <Flex flexDirection="column" alignItems="center" marginTop="1.5rem">
          <Text fontWeight="600" textAlign="center">
            Redirecting to <a href={toUrl}>{toUrl}</a> in {secsRemaining}{' '}
            {secsRemaining > 1 ? 'seconds' : 'second'}
          </Text>
        </Flex>
      </Flex>
    </PageLayout>
  )
}

export default Redirect
