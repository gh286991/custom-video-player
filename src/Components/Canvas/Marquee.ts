export type IDrawMarquee = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  fontSize: number,
  fontColor: string,
  speed: number
) => number;

export const drawMarquee :IDrawMarquee = (
  ctx,
  x,
  y,
  text,
  fontSize,
  fontColor,
  speed,
) => {
  ctx.font = `${fontSize}px`;
  ctx.fillStyle = fontColor;
  ctx.fillText(text, x, y);

  // 更新跑馬燈的 x 座標
  const updatedX = x - speed;
  
  return updatedX;
};