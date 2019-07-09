import {Flex, Text} from 'fannypack'
import {useRouter} from 'next/router'
import React, {useState} from 'react'
import Lottie from 'react-lottie'
import preval from 'preval.macro'
import {PageLayout} from '../components/PageLayout'
import {useInterval, useWindowFocused} from '../lib/hooks'

const DEFAULT_DURATION_SEC = 15

const redirects: {
  [id: string]: string
} = preval`
  module.exports = require('js-yaml').safeLoad(require('fs').readFileSync(require.resolve('../redirects.yml'), 'utf8'));
`

interface RedirectQuery {
  to?: string
  toId?: string
}

const Redirect: React.FC = _props => {
  const [secsRemaining, setTimeRemaining] = useState(DEFAULT_DURATION_SEC)
  const focused = useWindowFocused()
  const router = useRouter()

  const {to: encodedToUrl, toId} = (router.query || {}) as Partial<
    RedirectQuery
  >
  const toUrlFromId = toId && toId !== '' ? redirects[toId] : null
  const toUrl =
    toUrlFromId ||
    (encodedToUrl && encodedToUrl !== ''
      ? decodeURIComponent(encodedToUrl)
      : null)

  useInterval(() => {
    if (!toUrl || !focused) {
      return
    }
    if (secsRemaining === 0) {
      window.location.replace(toUrl)

      return
    }

    setTimeRemaining(secsRemaining - 1)
  }, 1000)

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
            speed={.5}
          />
        </Flex>
        <Flex flexDirection="column" alignItems="center" marginTop="1.5rem">
          <Text fontWeight="600" textAlign="center">
            Breathe. Redirecting to <a href={toUrl || '#'}>{toUrl || '…'}</a> in{' '}
            {secsRemaining} {secsRemaining > 1 ? 'seconds' : 'second'}
          </Text>
        </Flex>
      </Flex>
    </PageLayout>
  )
}

export default Redirect
