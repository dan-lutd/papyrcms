import { createContext } from 'react'

type SettingsContext = {
  settings: Settings,
  setSettings: Function
}

export default createContext<SettingsContext>({
  settings: {
    enableMenu: false,
    enableStore: false,
    enableBlog: false,
    enableEvents: false,
    enableCommenting: false,
    enableRegistration: false
  },
  setSettings: (settings: object) => {}
})