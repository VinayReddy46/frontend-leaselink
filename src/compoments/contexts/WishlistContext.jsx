import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    return savedWishlist ? JSON.parse(savedWishlist) : []
  })
  
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])
  
  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId)
  }
  
  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id))
    } else {
      setWishlist([...wishlist, product])
    }
  }
  
  const clearWishlist = () => {
    setWishlist([])
  }
  
  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      isInWishlist, 
      toggleWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}