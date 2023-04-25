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
  }
}

const enterFullScreenAlternative = (element: HTMLElement) => {
  element.style.position = 'fixed';
  element.style.top = '0';
  element.style.left = '0';
  element.style.width = '100vw';
  element.style.height = '100vh';
  element.style.zIndex = '1000';
};

const exitFullScreenAlternative = (element: HTMLElement) => {
  element.style.position = '';
  element.style.top = '';
  element.style.left = '';
  element.style.width = '';
  element.style.height = '';
  element.style.zIndex = '';
};
  
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
    } else {
      enterFullScreenAlternative(element);
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
    } else {
      if (containerRef.current) {
        exitFullScreenAlternative(containerRef.current);
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
