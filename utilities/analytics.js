import ReactGA from 'react-ga'
import keys from '../config/keys'

export const initGA = () => {
  ReactGA.initialize(keys.googleAnalyticsId)
}

export const logPageView = () => {
  console.log(window.location.pathname)
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action })
  }
}

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}
