export const drawBoxWithText = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement, 
  textD: string) => {
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

export const drawButton = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  textB: string,
) => {
  if (!ctx) return;
  ctx.fillStyle = '#4CAF50';
  ctx.fillRect(x, y, width, height);
  
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '14px Arial';
  const textWidth = ctx.measureText(textB).width;
  ctx.fillText(textB, x + (width - textWidth) / 2, y + (height + 14) / 2);
};
  