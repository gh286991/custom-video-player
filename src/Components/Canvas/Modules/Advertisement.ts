export const drawAdvertisement = (
  ctx: CanvasRenderingContext2D,
  adText: string,
  adWidth: number,
  adHeight: number,
) => {
  ctx.fillStyle = '#000000';
  ctx.fillRect(20, 20, adWidth, adHeight);
  
  ctx.font = '16px sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.textBaseline = 'middle';
  ctx.fillText(adText, 20 + adWidth / 2 - ctx.measureText(adText).width / 2, 20 + adHeight / 2);
};
  