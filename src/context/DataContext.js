import {createContext} from 'react'

const DataContext = createContext({
  loading: true,
  apidata: [],
  cart: [],
  setCart: () => {},
  activeMenuId: '11',
  setActiveMenuId: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
})

export default DataContext
