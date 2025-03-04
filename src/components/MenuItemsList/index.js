import {useContext, useEffect, useState} from 'react'
import './index.css'
import MenuItem from '../MenuItem'
import DataContext from '../../context/DataContext'

const MenuItemsList = () => {
  const {loading, apidata, activeMenuId} = useContext(DataContext)
  const [dishes, setDishes] = useState([])

  useEffect(() => {
    if (apidata?.table_menu_list) {
      const filteredDishes = apidata.table_menu_list.filter(
        item => item.menu_category_id === activeMenuId,
      )
      setDishes(filteredDishes[0]?.category_dishes || [])
    }
  }, [apidata, activeMenuId])

  return (
    <main className="dishes">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="dishes-list">
          {dishes.length > 0 &&
            dishes.map((item, index) => (
              <MenuItem
                key={item.dish_id}
                dish={item}
                index={index}
                activeMenuId={activeMenuId}
              />
            ))}
        </ul>
      )}
    </main>
  )
}
export default MenuItemsList
