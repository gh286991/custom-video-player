import { useEffect, useRef } from 'react';
import { IBarrage } from '../Modules/Barrages';

import { drawBarrages, 
  drawAdvertisement,
  drawMarquee,
} from '../Modules';
import { IMarqueeConfig } from '../Modules/Marquee';

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
  marqueeConfig: IMarqueeConfig
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
  marqueeConfig,
}: UseDrawProps) => {
  const marqueeXRef = useRef(0);

  useEffect(() => {
    if (!canvas || !video || !container) return;
    if (!ctx) return;

    let requestID: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      marqueeXRef.current = drawMarquee(ctx, marqueeXRef.current, marqueeConfig);
      drawAdvertisement(ctx, adText, adWidth, adHeight);
      drawBarrages(ctx, barrages);
      
      requestID = requestAnimationFrame(draw);
    };
      
    draw();
      
    return () => {
      cancelAnimationFrame(requestID);
    };
  }, [barrages, canvas, video, container, text, speed, fontSize, fontColor,
    backgroundColor, adText, adWidth, adHeight, isExpanded, ctx, marqueeConfig]);
  
};
      
export default useDrawCanvas;
      