import { useEffect, useRef, useState } from 'react';
import { IBarrage } from '../Modules/Barrages';

import { drawBarrages, drawAdvertisement, drawMarquee } from '../Modules';

type UseDrawProps = {
  barrages: IBarrage[];
  canvas: HTMLCanvasElement | null;
  video: HTMLVideoElement | null;
  container: HTMLDivElement | null;
  text: string;
  speed: number;
  fontSize: number;
  fontColor: string;
  backgroundColor: string;
  adText: string;
  adWidth: number;
  adHeight: number;
  isExpanded: boolean;
  ctx: CanvasRenderingContext2D | null | undefined;
};

const useDrawCanvas = ({
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
}: UseDrawProps) => {
  const marqueeXRef = useRef(0); 
  const [isBoxVisible, setIsBoxVisible] = useState(true); // 添加状态

  const drawBoxWithText = () => {
    if (!canvas || !video || !container) return;
    if (!ctx) return;
    const boxWidth = 200;
    const boxHeight = 100;
    const x = (canvas.width - boxWidth) / 2;
    const y = (canvas.height - boxHeight) / 2;
  
    // 绘制背景
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // 绘制方框
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x, y, boxWidth, boxHeight);
  
    // 绘制文本
    ctx.fillStyle = '#000000';
    ctx.font = '16px Arial';
    ctx.fillText('ccvcvcvvc', x + 10, y + 30);
  };

  useEffect(() => {
    if (!canvas || !video || !container) return;
    if (!ctx) return;

    let requestID: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      marqueeXRef.current = drawMarquee(ctx, marqueeXRef.current, 30, text, fontSize, fontColor, speed);
      drawAdvertisement(ctx, adText, adWidth, adHeight);
      drawBarrages(ctx, barrages);

      if (isBoxVisible) {
        drawBoxWithText(); // 调用绘制方框的函数
      }

      requestID = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(requestID);
    };
  }, [barrages, canvas, video,
    container, text, speed, fontSize, fontColor,
    backgroundColor, adText, adWidth, adHeight, isExpanded, isBoxVisible, ctx, drawBoxWithText]);

  const toggleBoxVisibility = () => {
    setIsBoxVisible(!isBoxVisible);
  };

  return {
    toggleBoxVisibility,
    isBoxVisible,
  };
  
};

export default useDrawCanvas;