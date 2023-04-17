import React from 'react';

interface IPlayButtonProps {
  isPlaying: boolean;
  onPlayButtonClick: () => void;
}

const PlayButton: React.FC<IPlayButtonProps> = ({ isPlaying, onPlayButtonClick }) => {
  return (
    <button
      style={{
        position: 'absolute',
        left: '20px',
        bottom: '-50px',
        padding: '5px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
      onClick={onPlayButtonClick}
    >
      {isPlaying ? '暫停' : '播放'}
    </button>
  );
};

export default PlayButton;
