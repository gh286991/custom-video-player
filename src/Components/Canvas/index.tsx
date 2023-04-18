import React, { useRef, useEffect } from 'react';
import { drawMarquee } from './Marquee';
import { drawAdvertisement } from './Advertisement';

interface IMarqueeCanvasProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  text: string;
  speed?: number;
  fontSize?: number;
  fontColor?: string;
  backgroundColor?: string;
  adText?: string;
  adWidth?: number;
  adHeight?: number;
  isExpanded?: boolean;
}

const CanvasContainer: React.FC<IMarqueeCanvasProps> = ({
  videoRef,
  containerRef,
  text,
  speed = 2,
  fontSize = 20,
  fontColor = '#FFFFFF',
  backgroundColor = 'rgba(0, 0, 0, 0.1)',
  adText = 'Advertisement',
  adWidth = 150,
  adHeight = 50,
  isExpanded = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const container = containerRef.current;
    if (!canvas || !video || !container) return;
    
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
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
    container.addEventListener('resize', updateCanvasSize);

    return () => {
      cancelAnimationFrame(requestID);
      window.removeEventListener('resize', updateCanvasSize);
      container.removeEventListener('resize', updateCanvasSize);
    };
  }, [videoRef, containerRef, text, speed, fontSize, fontColor, backgroundColor, adText, adWidth, adHeight, isExpanded]);

  return (
    <canvas ref={canvasRef}
      style={{ position: 'absolute',
        zIndex: 2,
        top: '0px',
        left: '0px',
        pointerEvents: 'none' }}
    />
  );
};

export default CanvasContainer;
