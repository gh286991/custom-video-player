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
        
      const drawBoxWithText = (textD: string) => {
        const boxWidth = 200;
        const boxHeight = 100;
        if (!canvas || !ctx) return;
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
        ctx.fillText(textD, x + 10, y + 30);
      };
    
      const drawButton = ( x:number, y: number, width:number, height:number, textB:string) => {
        if (!ctx) return;
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(x, y, width, height);
    
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '14px Arial';
        const textWidth = ctx.measureText(textB).width;
        ctx.fillText(textB, x + (width - textWidth) / 2, y + (height + 14) / 2);
      };
            
      if (isBoxVisible) {
        drawBoxWithText('Some text here'); // 调用绘制方框的函数
        drawButton( canvas.width / 2 - 50, canvas.height / 2 + 20, 100, 30, '确定');
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
      