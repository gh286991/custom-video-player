import { useEffect } from 'react';

const useClickHandler = (
  container: HTMLElement | null,
  canvas: HTMLCanvasElement | null,
  isBoxVisible: boolean,
  setIsBoxVisible: (visible: boolean) => void,
) => {
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
  }, [container, canvas, isBoxVisible, setIsBoxVisible]);
};

export default useClickHandler;
