import { useState } from 'react';

type AddBarrageProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  speed: number;
};
export interface IBarrage {
  barrageText: string;
  x: number;
  y: number;
  speed: number;
  color: string;
  fontSize: number;
}

export const drawBarrages = (ctx:CanvasRenderingContext2D, barrages:IBarrage[] ) => {
  barrages.forEach((barrage, index) => {
    ctx.font = `${barrage.fontSize}px`;
    ctx.fillStyle = barrage.color;
    ctx.fillText(barrage.barrageText, barrage.x, barrage.y);
      
    // 更新彈幕的 x 座標
    barrage.x -= barrage.speed;
      
    // 移除已經移出畫布的彈幕
    if (barrage.x < -ctx.measureText(barrage.barrageText).width) {
      barrages.splice(index, 1);
    }
  });
};

export const useAddBarrage = ({ canvasRef, speed }: AddBarrageProps) => {
  const [barrages, setBarrages] = useState<IBarrage[]>([]);

  const addBarrage = (barrageText: string, color = 'red') => {
    setBarrages((prevBarrages) => [
      ...prevBarrages,
      {
        barrageText,
        x: canvasRef.current?.width || 0,
        y: Math.random() * (canvasRef.current?.height || 0),
        speed,
        color,
        fontSize: 20,
      },
    ]);
  };
  return { 
    barrages,
    addBarrage,
  };
};
