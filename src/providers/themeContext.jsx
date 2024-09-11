// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize theme with value from localStorage or default to 'light-theme'
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? storedTheme : 'light-theme';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light-theme' ? 'dark-theme' : 'light-theme'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
