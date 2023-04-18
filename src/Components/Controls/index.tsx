import React from 'react';
import ProgressBar from './ProgressBar';
import PlayButton from './PlayButton';

interface ControlsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isExpanded: boolean;
  progress: number;
}
  
const Controls: React.FC<ControlsProps> = ({
  videoRef,
  isPlaying,
  setIsPlaying,
  setProgress,
  setIsExpanded,
  isExpanded,
  progress,
}: ControlsProps) => {
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const offsetX = e.nativeEvent.offsetX;
      const width = e.currentTarget.clientWidth;
      const newProgress = (offsetX / width) * 100;
      setProgress(newProgress);
  
      const newTime = (videoRef.current.duration * newProgress) / 100;
      videoRef.current.currentTime = newTime;
    }
  };
  
  const handlePlayButtonClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleFullscreen = () => {
    if (videoRef.current) {
      const videoElement = videoRef.current as HTMLVideoElement & {
        requestFullscreen?(): Promise<void>;
        webkitRequestFullscreen?(): Promise<void>;
        mozRequestFullScreen?(): Promise<void>;
        msRequestFullscreen?(): Promise<void>;
      };
  
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if (videoElement.webkitRequestFullscreen) {
        videoElement.webkitRequestFullscreen();
      } else if (videoElement.mozRequestFullScreen) {
        videoElement.mozRequestFullScreen();
      } else if (videoElement.msRequestFullscreen) {
        videoElement.msRequestFullscreen();
      }
    }
  };
  
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExpanded(false);
      }
    };
  
    document.addEventListener('keydown', handleEsc);
  
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  };
  
  return (
    <>
      <ProgressBar 
        progress={progress}
        onProgressClick={handleProgressClick}
      />
      <PlayButton 
        isPlaying={isPlaying}
        onPlayButtonClick={handlePlayButtonClick}
      />
      <button 
        onClick={handleFullscreen}
        style={{ position: 'absolute',
          bottom: '-60px',
          right: '10px', 
        }}
      >全屏
      </button>
      <button onClick={handleExpand}
        style={{ position: 'absolute',
          bottom: '-60px',
          right: '60px' }}
      >
        {isExpanded ? '缩小' : '放大'}
      </button>
    </>);
};
  
export default Controls;
  
