// AuthContext.js
import { createContext, useState } from 'react';

const AuthContext = createContext({
    authToken: null,
    setAuthToken: () => {},
    handlelogin: () => {}, // Add this line to the context value
  });
  

const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
  
    const handlelogin = (token) => {
        console.log("Auth Token updated:", token);
        setAuthToken(token);
      };
      
  
    return (
      <AuthContext.Provider value={{ authToken, setAuthToken, handlelogin }}>
        {children}
      </AuthContext.Provider>
    );
  };

export { AuthContext, AuthProvider };
