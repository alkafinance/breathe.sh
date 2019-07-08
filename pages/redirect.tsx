import {Box, Flex, Text} from 'fannypack'
import Router, {useRouter} from 'next/router'
import React, {EffectCallback, useRef, useEffect, useState} from 'react'
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
  const router = useRouter<RedirectQuery>()

  const {to: encodedToUrl = 'https://alka.app'} = router.query || {}
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
        <Flex flexDirection="column" alignItems="center">
          <Text fontWeight="600">
            Redirecting to <a href={toUrl}>{toUrl}</a> in {secsRemaining}{' '}
            {secsRemaining > 1 ? 'seconds' : 'second'}
          </Text>
        </Flex>
      </Box>
    </PageLayout>
  )
}

export default Redirect
