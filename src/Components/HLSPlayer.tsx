import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import CanvasContainer from './Canvas';
import Controls from './Controls';

interface IHLSPlayerProps {
  src: string;
}

const HLSPlayer: React.FC<IHLSPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const progresss = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(progresss);
      }
    };

    videoRef.current?.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

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
      <CanvasContainer containerRef={containerRef}
        isExpanded={isExpanded}
        videoRef={videoRef}
        text={'322323'}
      />
      <Controls
        videoRef={videoRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setProgress={setProgress}
        setIsExpanded={setIsExpanded}
        isExpanded={isExpanded}
        progress={progress}
      />
    </div>
  );
};

export default HLSPlayer;
