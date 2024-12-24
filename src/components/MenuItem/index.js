import {useContext, useState} from 'react'
import {BsFillCircleFill} from 'react-icons/bs'
import ApiDataContext from '../../context/ApiDataContext'
import './index.css'

const MenuItem = ({dish, index, activeMenuId}) => {
  const {setCart} = useContext(ApiDataContext)
  const [quantity, setQuantity] = useState(0)

  const {
    dish_id: dishId,
    dish_name: dishName,
    dish_price: dishPrice,
    dish_description: dishDescription,
    dish_currency: dishCurrency,
    dish_calories: dishCalories,
    dish_image: dishImage,
    dish_Availability: dishAvailability,
    addonCat,
  } = dish

  const circleColor = index % 2 === 0 ? 'green' : 'red'

  const updateCart = quantityChange => {
    setQuantity(prev => prev + quantityChange)
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.dishId === dishId)
      if (existingItem) {
        return prevCart.map(item =>
          item.dishId === dishId
            ? {...item, quantity: item.quantity + quantityChange}
            : item,
        )
      }
      return [
        ...prevCart,
        {
          dishId,
          dishName,
          dishPrice,
          dishImage,
          quantity: quantityChange > 0 ? 1 : 0,
          categoryId: activeMenuId,
        },
      ]
    })
  }

  const increaseQuantity = () => updateCart(1)
  const decreaseQuantity = () => {
    if (quantity > 0) updateCart(-1)
  }

  return (
    <li className="dish-item">
      <div className="dish-item-content">
        <div className="dish-icon-container" style={{borderColor: circleColor}}>
          <BsFillCircleFill
            className="dish-icon"
            style={{color: circleColor}}
          />
        </div>

        <div className="dish-info">
          <h1 className="dish-name">{dishName}</h1>
          <p className="dish-price">
            {dishCurrency} {dishPrice}
          </p>
          <p className="dish-description">{dishDescription}</p>

          {dishAvailability ? (
            <>
              <div className="quantity-container">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity === 0}
                  className="quantity-button decrease"
                >
                  -
                </button>
                <p className="quantity">{quantity}</p>
                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="quantity-button increase"
                >
                  +
                </button>
              </div>
              {addonCat.length > 0 && (
                <p className="customization-text">Customizations available</p>
              )}
            </>
          ) : (
            <p className="not-available-text">Not available</p>
          )}
        </div>
      </div>
      <p className="dish-calories">{dishCalories} Calories</p>
      <img className="dish-image" src={dishImage} alt={dishName} />
    </li>
  )
}

export default MenuItem
