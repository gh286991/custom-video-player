export interface Barrage {
  barrageText: string;
  x: number;
  y: number;
  speed: number;
  color: string;
  fontSize: number;
}

export   const drawBarrages = (ctx:CanvasRenderingContext2D, barrages:Barrage[] ) => {
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