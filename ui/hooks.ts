import {EffectCallback, useEffect, useRef, useState} from 'react'

export const useInterval = (callback: EffectCallback, delay: number) => {
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

export const useWindowFocused = () => {
  const [focused, setFocused] = useState(true)

  useEffect(() => {
    const handleFocus = (_event: FocusEvent) => {
      setFocused(true)
    }
    const handleBlur = (_event: FocusEvent) => {
      setFocused(false)
    }

    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)

    return () => {
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [])

  return focused
}
