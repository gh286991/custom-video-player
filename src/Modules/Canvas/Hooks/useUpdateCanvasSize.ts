// useUpdateCanvasSize.ts
import { useEffect } from 'react';

const useUpdateCanvasSize = (
  canvas: HTMLCanvasElement | null,
  video: HTMLVideoElement | null,
  container: HTMLElement | null,
  isExpanded: boolean,
) => {
  useEffect(() => {
    if (!canvas || !video || !container) return;

    const updateCanvasSize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    updateCanvasSize();

    window.addEventListener('resize', updateCanvasSize);
    container.addEventListener('resize', updateCanvasSize);
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      container.removeEventListener('resize', updateCanvasSize);
    };
  }, [video, container, canvas, isExpanded]);
};

export default useUpdateCanvasSize;
