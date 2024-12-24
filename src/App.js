import {useState, useEffect} from 'react'

import './App.css'
import Header from './components/Header'
import Navbar from './components/Navbar'
import MenuItemsList from './components/MenuItemsList'
import ApiDataContext from './context/ApiDataContext'

const App = () => {
  const [apidata, setApidata] = useState([])
  const [activeMenuId, setActiveMenuId] = useState('11')
  const [cart, setCart] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const url =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
      const response = await fetch(url)
      const data = await response.json()
      setApidata(data[0])
    }
    fetchData()
  }, [])

  return (
    <ApiDataContext.Provider
      value={{apidata, cart, setCart, activeMenuId, setActiveMenuId}}
    >
      <Header />
      <Navbar />
      <MenuItemsList />
    </ApiDataContext.Provider>
  )
}

export default App
