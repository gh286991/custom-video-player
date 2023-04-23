import React, { useState } from 'react';
import { ReactComponent as Arrow } from '../../Assets/icons/Arrow.svg';
import styles from './styles.module.scss';

interface IRotatingArrowProps {
  onClick: ()=>void
}

const RotatingArrow: React.FC<IRotatingArrowProps> = ({
  onClick,
}) => {
  const [isRotated, setIsRotated] = useState(false);

  const handleClick = () => {
    setIsRotated(!isRotated);
    onClick();
  };

  const arrowClass = isRotated
    ? `${styles['rotating-arrow']} ${styles.rotated}`
    : styles['rotating-arrow'];

  return (
    <div className={styles['rotating-arrow-container']}>
      <Arrow className={arrowClass}
        onClick={handleClick}
      ></Arrow>
    </div>
  );
};

export default RotatingArrow;
