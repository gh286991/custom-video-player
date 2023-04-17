import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import MarqueeCanvas from './Canvas';
import ProgressBar from './Controls/ProgressBar';
import PlayButton from './Controls/PlayButton';
interface IHLSPlayerProps {
  src: string;
}

const HLSPlayer: React.FC<IHLSPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <div style={{ position: 'relative', width: '640px', height: '480px' }}>
      <video ref={videoRef} width="100%" height="100%" controls data-testid='video-element' src={src}>
        <source type="application/x-mpegURL" />
        您的浏览器不支持 HTML5 视频。
      </video>
      <MarqueeCanvas videoRef={videoRef} text={'322323'} />
      <ProgressBar progress={progress} onProgressClick={handleProgressClick} />
      <PlayButton isPlaying={isPlaying} onPlayButtonClick={handlePlayButtonClick} />
    </div>
  );
};

export default HLSPlayer;
