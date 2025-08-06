import { useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'

function SearchBar({ onSearch, placeholder = "Search menu items..." }) {
  const [query, setQuery] = useState('')

  const handleSearch = (value) => {
    setQuery(value)
    onSearch(value)
  }

  const clearSearch = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
        {query && (
          <button onClick={clearSearch} className="clear-search">
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar