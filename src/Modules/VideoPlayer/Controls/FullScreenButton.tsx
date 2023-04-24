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
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitEnterFullScreen) { // iOS Safari
      element.webkitEnterFullScreen();
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitFullscreenElement) {
      const webkitFullscreenElement = document.webkitFullscreenElement as HTMLElement;
      if (typeof webkitFullscreenElement.webkitExitFullScreen === 'function') {
        webkitFullscreenElement.webkitExitFullScreen();
      }
    }
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
