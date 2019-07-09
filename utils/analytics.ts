import Avo from './__generated__/Avo.gen'

export const initAnalytics = () => {
  Avo.initAvo(
    {
      env:
        process.env.NODE_ENV === 'development'
          ? Avo.AvoEnv.Dev
          : Avo.AvoEnv.Prod,
    },
    {buildNumber: null},
    {},
    {
      make: (env: string) => {
        console.log('Avo make for', env)
      },
      logEvent: (eventName: string, properties: object) => {
        analytics.track(eventName, properties)
      },
    },
  )
}

export const getAnalytics = () => {
  return Avo
}

export const logPageView = () => {
  console.log(`Logging page view for ${window.location.pathname}`)
  analytics.page(window.location.pathname)
}
