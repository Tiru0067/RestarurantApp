import {createContext} from 'react'

const ApiDataContext = createContext({
  apidata: [],
  cart: [],
  setCart: () => {},
  activeMenuId: '11',
  setActiveMenuId: () => {},
})

export default ApiDataContext
