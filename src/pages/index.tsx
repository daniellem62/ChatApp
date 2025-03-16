import React from 'react';
import Chat from '../components/chat';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <Chat />
    </div>
  );
}

export default Home;