import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }

    // Load startups from localStorage
    const storedStartups = localStorage.getItem('startups');
    if (storedStartups) {
      try {
        setStartups(JSON.parse(storedStartups));
      } catch (error) {
        console.error('Error parsing startups data:', error);
        localStorage.removeItem('startups');
      }
    }
  }, []);

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In a real app, we would hash this
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addStartup = (startup) => {
    const newStartup = {
      ...startup,
      id: Date.now().toString(),
      userId: user.id,
    };
    
    const updatedStartups = [...startups, newStartup];
    setStartups(updatedStartups);
    localStorage.setItem('startups', JSON.stringify(updatedStartups));
  };

  const updateStartup = (id, updates) => {
    const updatedStartups = startups.map(startup => 
      startup.id === id ? { ...startup, ...updates } : startup
    );
    setStartups(updatedStartups);
    localStorage.setItem('startups', JSON.stringify(updatedStartups));
  };

  const deleteStartup = (id) => {
    const updatedStartups = startups.filter(startup => startup.id !== id);
    setStartups(updatedStartups);
    localStorage.setItem('startups', JSON.stringify(updatedStartups));
  };

  const value = {
    user,
    startups,
    register,
    login,
    logout,
    addStartup,
    updateStartup,
    deleteStartup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 