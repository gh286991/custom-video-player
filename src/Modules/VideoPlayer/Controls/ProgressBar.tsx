import React from 'react';

interface IProgressBarProps {
  progress: number;
  onProgressClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ProgressBar: React.FC<IProgressBarProps> = ({ progress, onProgressClick }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '-20px',
        left: '0',
        width: '100%',
        height: '5px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        cursor: 'pointer',
      }}
      onClick={onProgressClick}
    >
      <div style={{ 
        width: `${progress}%`,
        height: '100%',
        backgroundColor: 'blue' }}
      />
    </div>
  );
};

export default ProgressBar;
