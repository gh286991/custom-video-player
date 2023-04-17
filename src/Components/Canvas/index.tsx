import React, { useRef, useEffect } from 'react';
import { drawMarquee } from './Marquee';
import { drawAdvertisement } from './Advertisement';

interface IMarqueeCanvasProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  text: string;
  speed?: number;
  fontSize?: number;
  fontColor?: string;
  backgroundColor?: string;
  adText?: string;
  adWidth?: number;
  adHeight?: number;
}

const MarqueeCanvas: React.FC<IMarqueeCanvasProps> = ({
  videoRef,
  text,
  speed = 2,
  fontSize = 20,
  fontColor = '#FFFFFF',
  backgroundColor = 'rgba(0, 0, 0, 0.1)',
  adText = 'Advertisement',
  adWidth = 150,
  adHeight = 50,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = video.clientWidth;
      canvas.height = video.clientHeight;
    };

    let requestID: number;
    let x = canvas.width;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      x = drawMarquee(ctx, x, text, fontSize, fontColor, speed);
      if (x < -ctx.measureText(text).width) {
        x = canvas.width;
      }

      drawAdvertisement(ctx, adText, adWidth, adHeight);

      requestID = requestAnimationFrame(draw);
    };

    draw();

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      cancelAnimationFrame(requestID);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [videoRef, text, speed, fontSize, fontColor, backgroundColor, adText, adWidth, adHeight]);

  return (
    <canvas ref={canvasRef}  style={{ position: 'absolute', zIndex: 2,  top: '0px', left: '0px', pointerEvents: 'none' }} />

  );
};

export default MarqueeCanvas;
