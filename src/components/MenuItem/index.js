import {useContext} from 'react'
import {BsFillCircleFill} from 'react-icons/bs'
import DataContext from '../../context/DataContext'
import './index.css'

const MenuItem = ({dish, index}) => {
  const {cart, increaseQuantity, decreaseQuantity} = useContext(DataContext)

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
  const quantity = cart?.find(obj => obj.dishId === dishId)?.quantity || 0

  const handleIncreaseQuantity = () => increaseQuantity(dishId)

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      decreaseQuantity(dishId)
    }
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
                  onClick={handleDecreaseQuantity}
                  className="quantity-button decrease"
                >
                  -
                </button>
                <p className="quantity">{quantity > 0 ? quantity : '0'}</p>
                <button
                  type="button"
                  onClick={handleIncreaseQuantity}
                  className="quantity-button increase"
                >
                  +
                </button>
              </div>
              {addonCat?.length > 0 && (
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
