import React from 'react'
import styles from '../styles/register.module.css';

export default function Register() {
  return (
    <div className={styles.container}>
        <h1 className={styles.heading}>Register</h1>
        <form action="" className={styles.inputForm}>
            <div className={styles.inputDiv}>
                <label htmlFor="">Email : </label>
                <input type="text" placeholder='email' />
            </div>
            <div className={styles.inputDiv}>
                <label htmlFor="">Password : </label>
                <input type="password" placeholder='password' />
            </div>
            <button>Register</button>
        </form>
    </div>
  )
}
