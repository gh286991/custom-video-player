export const drawMarquee = (
  ctx: CanvasRenderingContext2D,
  x: number,
  text: string,
  fontSize: number,
  fontColor: string,
  speed: number,
) => {
  ctx.font = `${fontSize}px sans-serif`;
  ctx.fillStyle = fontColor;
  ctx.textBaseline = 'middle';
  // const textWidth = ctx.measureText(text).width;
  
  ctx.fillText(text, x, 20);
  
  return x - speed;
};
  