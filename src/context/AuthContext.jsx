import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signup = async (username, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        email,
        password,
      });
      setUser(response.data);
      return response.data;
    } catch (error) {
      throw error; 
    }
  };

  const signin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', {
        email,
        password,
      });
      setUser(response.data);
      return response.data;
    } catch (error) {
      throw error; 
    }
  };

  return (
    <AuthContext.Provider value={{ user, signup, signin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
