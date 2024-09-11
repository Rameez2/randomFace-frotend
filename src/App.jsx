import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routers/Home';
import CallPage from './routers/CallPage';
import Header from './components/Header';
import Login from './routers/Login';
import Register from './routers/Register';
import ProfilePage from './routers/ProfilePage';
import { ThemeContext } from './providers/themeContext';
import { useContext,useEffect } from 'react';

function App() {

  const {theme} = useContext(ThemeContext);
  // Apply the theme class to the body element when the theme changes
  useEffect(() => {
    document.body.className = theme; // Set the theme on the body element
  }, [theme]);

  return (
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/call-page" element={<CallPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage />} />
          
          <Route path="*" element={<h1>404 Page not found</h1>} />
        </Routes>
      </Router>
  );
}

export default App;
