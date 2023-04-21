import React, { useRef, useState } from 'react';
import useUpdateCanvasSize from './Hooks/useUpdateCanvasSize';
import useDrawCanvas from './Hooks/useDrawCanvas';

import { useAddBarrage } from './Modules';

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
  isFullScreen?: boolean;
}

const CanvasContainer: React.FC<IMarqueeCanvasProps> = ({
  videoRef,
  containerRef,
  text,
  speed = 2,
  fontSize = 20,
  fontColor = '#FFFFFF',
  backgroundColor = 'rgba(0, 253, 0, 0.1)',
  adText = 'Advertisement',
  adWidth = 150,
  adHeight = 50,
  isExpanded = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const { barrages, addBarrage } = useAddBarrage({ canvasRef,
    speed: 2 });

  const ctx = canvasRef.current?.getContext('2d');
  const canvas = canvasRef.current;
  const video = videoRef.current;
  const container = containerRef.current;

  useUpdateCanvasSize(canvas, video, container, isExpanded);

  const { toggleBoxVisibility, isBoxVisible } = useDrawCanvas({
    barrages,
    canvas,
    video,
    container,
    text,
    speed,
    fontSize,
    fontColor,
    backgroundColor,
    adText,
    adWidth,
    adHeight,
    isExpanded,
    ctx,
  });
  
  return (
    <>
      <canvas ref={canvasRef}
        style={{ position: 'absolute',
          zIndex: 2,
          top: '0px',
          left: '0px',
          pointerEvents: 'none' }}
      />
      {isBoxVisible && (
        <button
          onClick={toggleBoxVisibility}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10, // 确保按钮位于 Canvas 之上
          }}
        >
          确定
        </button>
      )}
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
