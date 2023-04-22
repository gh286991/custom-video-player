import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import CanvasContainer from './Canvas';
import Controls from './Controls';
import Dialog from './Dialog';
interface IHLSPlayerProps {
  src: string;
}

const showDiaLogTime = 2;

const HLSPlayer: React.FC<IHLSPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [ isDialogVisible, setIsDialogVisible ] = useState<boolean>(false);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play();
        });
        return () => {
          hls.destroy();
        };
      } if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = src;
        videoRef.current.addEventListener('loadedmetadata', () => {
          videoRef.current?.play();
        });
      }
    }
  }, [src]);

  useEffect(() => {
    const currentVideoRef = videoRef.current;
  
    const handleTimeUpdate = () => {
      if (currentVideoRef) {
        const progressBar = (currentVideoRef.currentTime / currentVideoRef.duration) * 100;
    
        setProgress(progressBar);

        // 檢查是否剛好播放了 10 秒
        if (Math.floor(currentVideoRef.currentTime) === showDiaLogTime) {
          console.log(`視頻剛好播放了 ${showDiaLogTime} 秒`);
          // 在這裡執行您想在 10 秒時執行的操作
          setIsDialogVisible(true);
        }
      }
    };
  
    currentVideoRef?.addEventListener('timeupdate', handleTimeUpdate);
  
    return () => {
      currentVideoRef?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoRef]);

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
        text={'test343'}
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
