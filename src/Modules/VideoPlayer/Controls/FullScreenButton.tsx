import React from 'react';

interface IFullScreenButton {
  containerRef: React.RefObject<HTMLDivElement> ;
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
  }
}

const FullScreenButton = ({ containerRef }: IFullScreenButton) => {
  const enterFullScreen = (element: HTMLElement) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
      element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
      element.mozRequestFullScreen();
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
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
