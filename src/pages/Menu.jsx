import { useState, useEffect } from 'react'
import MenuItem from '../components/MenuItem'
import SearchBar from '../components/SearchBar'
import LoadingSpinner from '../components/LoadingSpinner'

function Menu() {
  const [menuItems, setMenuItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [categories, setCategories] = useState(['All'])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch('/db.json')
      .then(res => res.json())
      .then(data => {
        setMenuItems(data.menu)
        const uniqueCategories = ['All', ...new Set(data.menu.map(item => item.category))]
        setCategories(uniqueCategories)
      })
      .catch(() => {
        const fallbackMenu = [
          { id: 1, name: 'Chicken Biryani', price: 500, category: 'Main', image: '/images/biryani.jpg' },
          { id: 2, name: 'Burger', price: 350, category: 'Fast Food', image: '/images/burger.jpg' }
        ]
        setMenuItems(fallbackMenu)
        setCategories(['All', 'Main', 'Fast Food'])
      })
      .finally(() => setLoading(false))
  }, [])
  
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <LoadingSpinner size="large" text="Loading delicious menu..." />
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container">
        <h1 style={{textAlign: 'center', marginBottom: '2rem'}}>Our Menu</h1>
        
        <SearchBar onSearch={setSearchQuery} placeholder="Search for your favorite dish..." />
        
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

        {filteredItems.length === 0 ? (
          <div style={{textAlign: 'center', padding: '3rem', color: 'var(--text-light)'}}>
            <h3>No items found</h3>
            <p>Try adjusting your search or category filter</p>
          </div>
        ) : (
          <div className="grid grid-2">
            {filteredItems.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Menu