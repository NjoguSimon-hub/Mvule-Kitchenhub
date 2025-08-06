import { useState } from 'react'

function MenuItem({ item }) {
  const [isAdding, setIsAdding] = useState(false)

  const addToCart = async () => {
    setIsAdding(true)
    
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find(cartItem => cartItem.id === item.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...item, quantity: 1 })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cartUpdated'))
    setIsAdding(false)
  }

  return (
    <div className="card" style={{overflow: 'hidden'}}>
      <div style={{position: 'relative', height: '200px', background: 'var(--bg-light)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div style={{
          display: item.image ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          fontSize: '4rem',
          color: 'var(--text-light)'
        }}>
          🍽️
        </div>
      </div>
      <div style={{padding: '1rem'}}>
        <h3 style={{marginBottom: '0.5rem'}}>{item.name}</h3>
        {item.description && (
          <p style={{
            color: 'var(--text-light)', 
            fontSize: '0.9rem', 
            margin: '0.5rem 0',
            lineHeight: '1.4'
          }}>
            {item.description}
          </p>
        )}
        <div className="price" style={{fontSize: '1.2rem', fontWeight: 'bold', margin: '1rem 0'}}>KSh {item.price}</div>
        <button 
          className={`btn ${isAdding ? 'loading' : ''}`} 
          onClick={addToCart} 
          disabled={isAdding}
          style={{width: '100%'}}
        >
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default MenuItem