import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './navigation.css';

export const Navigation = () =>
    <nav className={styles.nav}>
        <li><NavLink activeClassName={styles.active} to='/summary'>Summary</NavLink></li>
        <li><NavLink activeClassName={styles.active} to='/entries'>Entries</NavLink></li>
        <li><NavLink activeClassName={styles.active} to='/add-entry'>Add new entry</NavLink></li>
    </nav>;

Navigation.displayName = 'Navigation';
