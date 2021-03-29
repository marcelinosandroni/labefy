import { createContext, useState } from 'react'

export const AuthContext = createContext({
  isLoged: false,
  changeIsLoged: () => {}
})

export const AuthContextProvider = props => {
  const [isLoged, setIsLoged] = useState(false)
  
  const changeIsLoged = () => {
    setIsLoged((prevIsLoged) => !prevIsLoged)
  }
  
  return (
    <AuthContext.Provider
    value={{isLoged, changeIsLoged}}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

