import { createContext, useContext, useState } from 'react'

const SearchContext = createContext()

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    price: { min: null, max: null },
    dates: { start: null, end: null },
    onlyAvailable: false,
    category: null
  })
  const [location, setLocation] = useState(null)
  const [sortBy, setSortBy] = useState('relevance')
  
  return (
    <SearchContext.Provider value={{ 
      searchTerm, 
      setSearchTerm,
      filters,
      setFilters,
      location,
      setLocation,
      sortBy,
      setSortBy
    }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  return useContext(SearchContext)
}