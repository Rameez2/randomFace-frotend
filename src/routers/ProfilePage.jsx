import React from 'react';
import styles from '../styles/profile.module.css';

export default function ProfilePage() {
  return (
    <div>
        <h1>Profile</h1>
        <div className="userDetails">
            <div className={styles.profileImageContainer}>
                <img src="https://as1.ftcdn.net/v2/jpg/05/63/15/16/1000_F_563151676_GGAx4z4KtnwNL8OVFH5nHwnC1TVBfUyO.jpg" alt="" />
            </div>
            <h3>Email : syedrameezshahpesh@gmail.com</h3>
            <h3>Name : Syed Rameez Shah</h3>
        </div>
    </div>
  )
}
