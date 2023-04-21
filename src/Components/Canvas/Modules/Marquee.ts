export type IDrawMarquee = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  fontSize: number,
  fontColor: string,
  speed: number
) => number;

export const drawMarquee: IDrawMarquee = (
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

  // 更新跑马灯的 x 坐标
  let updatedX = x - speed;

  // 如果跑马灯文本已完全移出画布，则将 updatedX 重置为 canvas.width
  if (updatedX < -ctx.measureText(text).width) {
    updatedX = ctx.canvas.width;
  }

  return updatedX;
};
