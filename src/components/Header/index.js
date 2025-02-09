import {useContext, useState, useEffect} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'
import ApiDataContext from '../../context/ApiDataContext'

const Header = () => {
  const {cart, apidata, activeMenuId} = useContext(ApiDataContext)
  const [cartAmount, setCartAmount] = useState(0)
  const [ordersText, setOrdersText] = useState('')

  useEffect(() => {
    if (apidata.length !== 0) {
      setOrdersText('My Orders')
    }
  }, [apidata])

  useEffect(() => {
    // const totalItemsQuantity = cart.reduce((sum, obj) => sum + obj.quantity, 0)
    const totalItemsQuantity = cart.length
    setCartAmount(totalItemsQuantity)
  }, [cart, activeMenuId])

  return (
    <header>
      <h1 className="app-title">{apidata.restaurant_name}</h1>
      <div className="cart-container">
        <p>{ordersText}</p>
        <button type="button" className="cart-btn">
          <p className="cart-items-count">{cartAmount}</p>
          <AiOutlineShoppingCart className="cart-icon" />
        </button>
      </div>
    </header>
  )
}

export default Header
