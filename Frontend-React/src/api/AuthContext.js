// AuthContext.js
import { createContext, useState, useEffect } from 'react';


const AuthContext = createContext({
    authToken: null,
    setAuthToken: () => {},
    handlelogin: () => {}, 
    //handleLogout: () => {}// Add this line to the context value
  });
  

const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setAuthToken(storedToken);
      }
    }, []);
  
    const handlelogin = (token) => {
      console.log("Token received in handlelogin:", token);
      setAuthToken(token);
      localStorage.setItem('token', token);
      const storedToken = localStorage.getItem('token'); // Retrieving the token
    };
    

      const handleLogout = () => {
        setAuthToken(null);
        localStorage.removeItem('token'); // Remove the token from localStorage
      };
      
      
  
    return (
      <AuthContext.Provider value={{ authToken, setAuthToken, handlelogin }}>
        {children}
      </AuthContext.Provider>
    );
  };

export { AuthContext, AuthProvider };
