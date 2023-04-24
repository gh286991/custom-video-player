import React from 'react';

interface IFullScreenButton {
  containerRef: React.RefObject<HTMLDivElement>;
}

// Extend the Document and HTMLElement interfaces
declare global {
  interface Document {
    webkitExitFullscreen?: () => void;
    msExitFullscreen?: () => void;
    mozCancelFullScreen?: () => void;
    webkitFullscreenElement?: Element;
    msFullscreenElement?: Element;
    mozFullScreenElement?: Element;
  }
  interface HTMLElement {
    webkitRequestFullscreen?: () => Promise<void>;
    msRequestFullscreen?: () => void;
    mozRequestFullScreen?: () => void;
    webkitEnterFullScreen?: () => void;
    webkitExitFullScreen?: () => void;
  }
}

const FullScreenButton = ({ containerRef }: IFullScreenButton) => {
  const enterFullScreen = (element: HTMLElement) => {
    const enterFullScreenFunctions = [
      () => element.requestFullscreen?.(),
      () => element.webkitRequestFullscreen?.(),
      () => element.msRequestFullscreen?.(),
      () => element.mozRequestFullScreen?.(),
      () => element.webkitEnterFullScreen?.(),
    ];
      
    enterFullScreenFunctions.find(enterFunction => enterFunction());
  };
      
  const exitFullScreen = () => {
    const exitFullScreenFunctions = [
      () => document.exitFullscreen?.(),
      () => document.webkitExitFullscreen?.(),
      () => document.msExitFullscreen?.(),
      () => document.mozCancelFullScreen?.(),
      () => {
        if (document.webkitFullscreenElement) {
          const webkitFullscreenElement = document.webkitFullscreenElement as HTMLElement;
          if (typeof webkitFullscreenElement.webkitExitFullScreen === 'function') {
            webkitFullscreenElement.webkitExitFullScreen();
            return true;
          }
        }
        return false;
      },
    ];
      
    exitFullScreenFunctions.find(exitFunction => exitFunction());
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement &&
          !document.webkitFullscreenElement &&
          !document.msFullscreenElement &&
          !document.mozFullScreenElement) {
        enterFullScreen(containerRef.current);
      } else {
        exitFullScreen();
      }
    }
  };

  return (
    <button
      style={{
        position: 'absolute',
        bottom: '-100px',
        right: '10px',
      }}
      onClick={toggleFullscreen}
    >
      Toggle Fullscreen
    </button>
  );
};

export default FullScreenButton;
