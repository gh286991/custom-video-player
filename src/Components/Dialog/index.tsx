// Dialog.tsx
import React from 'react';

import styles from './index.module.scss';

type DialogProps = {
  boxWidth: number;
  boxHeight: number;
  setIsDialogVisible: (visible: boolean) => void;
};

const Dialog: React.FC<DialogProps> = ({ boxWidth, boxHeight, setIsDialogVisible }) => {
  return (
    <div
      className={styles.dialog}
      style={{
        top: `calc(50% - ${boxHeight / 2}px)`,
        left: `calc(50% - ${boxWidth / 2}px)`,
        width: `${boxWidth}px`,
        height: `${boxHeight}px`,
      }}
    >
      <p>您的文本</p>
      <button
        onClick={() => {
          setIsDialogVisible(false);
        }}
      >
        確定
      </button>
    </div>
  );
};

export default Dialog;
