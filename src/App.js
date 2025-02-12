import {useState, useEffect} from 'react'

import './App.css'
import Header from './components/Header'
import Navbar from './components/Navbar'
import MenuItemsList from './components/MenuItemsList'
import DataContext from './context/DataContext'

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

  // update cart
  const updateCart = (dishId, quantityChange) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.dishId === dishId)
      if (existingItem) {
        const updatedCart = prevCart.map(item =>
          item.dishId === dishId
            ? {...item, quantity: item.quantity + quantityChange}
            : item,
        )
        return updatedCart.filter(item => item.quantity > 0)
      }
      if (quantityChange > 0) {
        const dishes = apidata?.table_menu_list?.filter(
          item => item.menu_category_id === activeMenuId,
        )
        const dish = dishes.find(item => item.dishId === dishId) || {}
        return [
          ...prevCart,
          {
            dishId,
            ...dish,
            quantity: 1,
            categoryId: activeMenuId,
          },
        ]
      }
      return prevCart
    })
  }

  const increaseQuantity = dishId => updateCart(dishId, 1)
  const decreaseQuantity = dishId => updateCart(dishId, -1)

  return (
    <DataContext.Provider
      value={{
        apidata,
        cart,
        setCart,
        activeMenuId,
        setActiveMenuId,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      <Header />
      <Navbar />
      <MenuItemsList />
    </DataContext.Provider>
  )
}

export default App
