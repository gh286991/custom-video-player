import React, { useRef, useState } from 'react';

import CanvasContainer from '../Canvas';
import Controls from './Controls';
import Dialog from '../../Components/Dialog';
import { useVideoTimeUpdate, useHLSPlayerSetup } from './hooks';
import { IMarqueeConfig } from '../Canvas/Modules';

interface IHLSPlayerProps {
  src: string;
  marqueeText?: string;
  marqueeConfig: IMarqueeConfig
}

const showDiaLogTime = 2;

const HLSPlayer: React.FC<IHLSPlayerProps> = ({ src, marqueeText, marqueeConfig }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [ isDialogVisible, setIsDialogVisible ] = useState<boolean>(false);

  useHLSPlayerSetup(videoRef, src);

  useVideoTimeUpdate(videoRef, showDiaLogTime, setIsDialogVisible, setProgress);

  const containerStyle : React.CSSProperties = isExpanded
    ? { position: 'fixed',
      width: '100vw',
      height: '100vh',
      top: 0,
      left: 0,
      zIndex: 1000 } 
    : { position: 'relative',
      width: '640px',
      height: '480px' } ;

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div  
      ref={containerRef}
      style={containerStyle}
    >
      <video ref={videoRef}
        width="100%"
        height="100%"
        controls
        data-testid='video-element'
        playsInline
        src={src}
      >
        <source type="application/x-mpegURL" />
        您的浏览器不支持 HTML5 视频。
      </video>
      <CanvasContainer 
        containerRef={containerRef}
        isExpanded={isExpanded}
        videoRef={videoRef}
        isFullScreen={isFullScreen}
        text={marqueeText || ''}
        marqueeConfig={marqueeConfig}
      />
      {isDialogVisible && (
        <Dialog
          boxWidth={200}
          boxHeight={100}
          setIsDialogVisible={setIsDialogVisible}
        />
      )}
      <Controls
        videoRef={videoRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setProgress={setProgress}
        setIsExpanded={setIsExpanded}
        isExpanded={isExpanded}
        progress={progress}
        setIsFullScreen={setIsFullScreen}
      />
      <button 
        style={{
          position: 'absolute',
          bottom: '-100px',
          right:'10px',
        }} 
        onClick={toggleFullscreen}
      >
        Toggle Fullscreen
      </button>

    </div>
  );
};

export default HLSPlayer;
