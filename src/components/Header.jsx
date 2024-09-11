import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/header.module.css';
import { ThemeContext } from '../providers/themeContext';

export default function Header() {

  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log('theme', theme);

  return (
    <div className={styles.container}>
      <h1><Link to="/">Home</Link></h1>
      <h1><Link to="/login">login</Link></h1>
      <h1><Link to="/register">register</Link></h1>
      <h1><Link to="/profile">Profile Page</Link></h1>
      <h1><Link to="/call-page">Call Page</Link></h1>
      <div className={styles.switchContainer}>
        <label htmlFor="switch" className={styles.switch}>
          <input id="switch" type="checkbox" defaultChecked={theme === 'light-theme'} onClick={toggleTheme} /> 
          <span className={styles.slider}></span>
          <span className={styles.decoration}></span>
        </label>
      </div>

    </div>
  )
}
