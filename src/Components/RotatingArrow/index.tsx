import React from 'react';
import  { ReactComponent as Arrow } from '../../Assets/icons/Arrow.svg';
import styles from './styles.module.scss';

const RotatingArrow: React.FC = () => {
  return (
    <div className={styles['rotating-arrow-container']}>
      <Arrow className={styles['rotating-arrow']}></Arrow>
    </div>
  );
};

export default RotatingArrow;
