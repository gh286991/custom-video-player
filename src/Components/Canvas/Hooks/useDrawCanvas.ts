import { useEffect, useRef, useState } from 'react';
import { IBarrage } from '../Modules/Barrages';

import { drawBarrages, 
  drawAdvertisement,
  drawMarquee,
  drawBoxWithText,
  drawButton } from '../Modules';

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
  const [isBoxVisible, setIsBoxVisible] = useState(true);

  useEffect(() => {
    if (!canvas || !video || !container) return;
    if (!ctx) return;

    let requestID: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      marqueeXRef.current = drawMarquee(ctx, marqueeXRef.current, 30, text,
        fontSize, fontColor, speed);
      drawAdvertisement(ctx, adText, adWidth, adHeight);
      drawBarrages(ctx, barrages);
            
      if (isBoxVisible) {
        drawBoxWithText(ctx, canvas, '您的文本'); // 调用绘制方框的函数
        drawButton( ctx, canvas.width / 2 - 50, canvas.height / 2 + 20, 100, 30, '确定');
      }
      
      requestID = requestAnimationFrame(draw);
    };
      
    draw();
      
    return () => {
      cancelAnimationFrame(requestID);
    };
  }, [barrages, canvas, video, 
    container, text, speed, fontSize, 
    fontColor, backgroundColor, adText, 
    adWidth, adHeight, isExpanded, isBoxVisible, ctx,
  ]);
    
  useEffect(() => {
    if (!container) return;
        
    const handleClick = (event: MouseEvent) => {
      if (!canvas) return;
      const mouseX = event.clientX - canvas.getBoundingClientRect().left;
      const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    
      const buttonX = canvas.width / 2 - 50;
      const buttonY = canvas.height / 2 + 20;
      const buttonWidth = 100;
      const buttonHeight = 30;

      const toggleBoxVisibility = () => {
        setIsBoxVisible(false);
      };

      if (
        mouseX >= buttonX &&
        mouseX <= buttonX + buttonWidth &&
        mouseY >= buttonY &&
        mouseY <= buttonY + buttonHeight
      ) {
        toggleBoxVisibility();
      }
    };
    
    container.addEventListener('click', handleClick);
    
    return () => {
      container.removeEventListener('click', handleClick);
    };
  }, [container, canvas, isBoxVisible]);
  
};
      
export default useDrawCanvas;
      