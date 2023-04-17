import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import MarqueeCanvas from './Canvas';
import ProgressBar from './Controls/ProgressBar';
import PlayButton from './Controls/PlayButton';
interface IHLSPlayerProps {
  src: string;
}

type CustomVideoElement = HTMLVideoElement & {
  webkitRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  msRequestFullscreen?: () => void;
};

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
      const videoElement = videoRef.current as CustomVideoElement;
  
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
  
    //如果按下 Esc 按鈕，會縮小
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

  const containerStyle : React.CSSProperties = isExpanded
    ? { position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0, zIndex: 1000 } 
    : { position: 'relative', width: '640px', height: '480px' } ;

  return (
    <div  ref={containerRef} style={containerStyle} >
      <video ref={videoRef} width="100%" height="100%" controls data-testid='video-element' src={src}>
        <source type="application/x-mpegURL" />
        您的浏览器不支持 HTML5 视频。
      </video>
      <MarqueeCanvas containerRef={containerRef} isExpanded={isExpanded} videoRef={videoRef} text={'322323'} />
      <ProgressBar progress={progress} onProgressClick={handleProgressClick} />
      <PlayButton isPlaying={isPlaying} onPlayButtonClick={handlePlayButtonClick} />
      <button onClick={handleFullscreen} style={{ position: 'absolute', bottom: '-60px', right: '10px' }}>全屏</button>
      <button onClick={handleExpand} style={{ position: 'absolute', bottom: '-60px', right: '60px' }}>
        {isExpanded ? '缩小' : '放大'}
      </button>
    </div>
  );
};

export default HLSPlayer;
