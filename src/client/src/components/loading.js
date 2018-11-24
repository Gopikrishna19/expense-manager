import React from 'react';
import styles from './loading.css';

export const Loading = () =>
    <div className={styles.container}>
        <div className={styles.loader}>
            <div className={styles.dot}/>
            <div className={styles.dot}/>
            <div className={styles.dot}/>
            <div className={styles.dot}/>
        </div>
    </div>;

Loading.displayName = 'Loading';
