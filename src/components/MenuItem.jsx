function MenuItem({ item }) {
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find(cartItem => cartItem.id === item.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...item, quantity: 1 })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    alert(`${item.name} added to cart!`)
  }

  return (
    <div className="card menu-item">
      {item.image && (
        <img 
          src={item.image} 
          alt={item.name}
          onError={(e) => e.target.style.display = 'none'}
        />
      )}
      <div className="menu-item-info">
        <h3>{item.name}</h3>
        <div className="price">KSh {item.price}</div>
        <button className="btn" onClick={addToCart} style={{marginTop: '1rem'}}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default MenuItem