import {useContext, useState, useEffect} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'
import DataContext from '../../context/DataContext'

const Header = () => {
  const {loading, cart, apidata, activeMenuId} = useContext(DataContext)
  const [cartAmount, setCartAmount] = useState(0)

  useEffect(() => {
    const totalItemsQuantity = cart.reduce((sum, obj) => sum + obj.quantity, 0)
    // const totalItemsQuantity = cart.length
    setCartAmount(totalItemsQuantity)
  }, [cart, activeMenuId])

  return (
    <div className='header'>
      <h1 className='app-title'>{apidata.restaurant_name}</h1>
      <div className='cart-container'>
        {!loading && <p>My Orders</p>}
        {!loading && <p className='cart-items-count'>{cartAmount}</p>}
        <button type='button' className='cart-btn'>
          <AiOutlineShoppingCart className='cart-icon' />
        </button>
      </div>
    </div>
  )
}

export default Header
