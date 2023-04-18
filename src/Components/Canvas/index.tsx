import React, { useRef, useEffect, useState } from 'react';
import { drawMarquee } from './Marquee';
import { drawAdvertisement } from './Advertisement';
import { drawBarrages } from './Barrages';

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

interface Barrage {
  barrageText: string;
  x: number;
  y: number;
  speed: number;
  color: string;
  fontSize: number;
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
  const [barrages, setBarrages] = useState<Barrage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const addBarrage = (barrageText: string, color = 'red') => {
    console.log('barrageText: ', barrageText);
    setBarrages((prevBarrages) => [
      ...prevBarrages,
      {
        barrageText,
        x: canvasRef.current?.width || 0,
        y: Math.random() * (canvasRef.current?.height || 0),
        speed,
        color,
        fontSize,
      },
    ]);
  };

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
      drawBarrages(ctx, barrages);
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
  }, [barrages, videoRef, containerRef, text, speed, fontSize, fontColor, backgroundColor, adText, adWidth, adHeight, isExpanded]);

  return (
    <>
      <canvas ref={canvasRef}
        style={{ position: 'absolute',
          zIndex: 2,
          top: '0px',
          left: '0px',
          pointerEvents: 'none' }}
      />
      <input
        style={{ position: 'absolute',
          zIndex: 2,
          bottom: '-100px',
          left: '0px',
        }}
        value={inputValue}
        onChange={(event)=> {
          setInputValue(event.target.value);
        }}
        type='text'
      ></input>
      <button
        style={{ position: 'absolute',
          zIndex: 2,
          bottom: '-100px',
          left: '150px',
        }}
        onClick={() => {
          addBarrage(inputValue);
        }}
      >
        Send Barrage
      </button>
    </>

  );
};

export default CanvasContainer;
