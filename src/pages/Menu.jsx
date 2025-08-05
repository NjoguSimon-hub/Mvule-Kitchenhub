import { useState, useEffect } from 'react'
import MenuItem from '../components/MenuItem'

function Menu() {
  const [menuItems, setMenuItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [categories, setCategories] = useState(['All'])

  useEffect(() => {
    fetch('/db.json')
      .then(res => res.json())
      .then(data => {
        setMenuItems(data.menu)
        const uniqueCategories = ['All', ...new Set(data.menu.map(item => item.category))]
        setCategories(uniqueCategories)
      })
      .catch(() => {
        // Fallback data if db.json fails to load
        const fallbackMenu = [
          { id: 1, name: 'Chicken Biryani', price: 500, category: 'Main', image: '/images/biryani.jpg' },
          { id: 2, name: 'Burger', price: 350, category: 'Fast Food', image: '/images/burger.jpg' }
        ]
        setMenuItems(fallbackMenu)
        setCategories(['All', 'Main', 'Fast Food'])
      })
  }, [])
  
  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory)

  return (
    <div className="page">
      <div className="container">
        <h1 style={{textAlign: 'center', marginBottom: '2rem'}}>Our Menu</h1>
        
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          {categories.map(category => (
            <button
              key={category}
              className={`btn ${selectedCategory === category ? '' : 'btn-outline'}`}
              onClick={() => setSelectedCategory(category)}
              style={{margin: '0 0.5rem', background: selectedCategory === category ? 'var(--primary)' : 'transparent', color: selectedCategory === category ? 'white' : 'var(--primary)', border: '1px solid var(--primary)'}}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-2">
          {filteredItems.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Menu