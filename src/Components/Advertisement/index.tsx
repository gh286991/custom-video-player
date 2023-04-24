import React, { useState } from 'react';
import { ReactComponent as Cross } from '../../Assets/icons/Cross.svg';

import styles from './styles.module.scss';

type AdDialogProps = {
  boxWidth: number;
  boxHeight: number;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  imageUrl?: string;
  text?: string;
};

const AdDialog: React.FC<AdDialogProps> = ({ boxWidth, boxHeight, position, imageUrl, text }) => {
  const [isVisible, setIsVisible] = useState(true);

  const getStyle = () => {
    switch (position) {
      case 'top-left':
        return { top: 0,
          left: 0,
          width: boxWidth,
          height: boxHeight };
      case 'top-right':
        return { top: 0,
          right: 0,
          width: boxWidth,
          height: boxHeight };
      case 'bottom-left':
        return { bottom: 0,
          left: 0,
          width: boxWidth,
          height: boxHeight };
      case 'bottom-right':
        return { bottom: 0,
          right: 0,
          width: boxWidth,
          height: boxHeight };
    }
  };

  if (!isVisible) return null;

  return (
    <div className={styles.adDialog}
      style={getStyle()}
    >
      <div>
        {imageUrl && <img src={imageUrl}
          alt="廣告圖片"
        />}
      </div>
    
      {text && <p>{text}</p>}
      <button
        className={styles.closeButton}
        onClick={() => {
          setIsVisible(false);
        }}
      >
        <Cross 
          className={styles.crossIcon}
        />
      </button>
    </div>
  );
};

export default AdDialog;
