import { useEffect } from 'react';

export const useVideoTimeUpdate = (
  videoRef: React.RefObject<HTMLVideoElement>,
  showDiaLogTime: number,
  setIsDialogVisible: (visible: boolean) => void,
  setProgress: (progress: number) => void,
) => {
  useEffect(() => {
    const currentVideoRef = videoRef.current;

    const handleTimeUpdate = () => {
      if (currentVideoRef) {
        const progressBar =
          (currentVideoRef.currentTime / currentVideoRef.duration) * 100;

        setProgress(progressBar);

        if (Math.floor(currentVideoRef.currentTime) === showDiaLogTime) {
          console.log(`視頻剛好播放了 ${showDiaLogTime} 秒`);
          setIsDialogVisible(true);
        }
      }
    };

    currentVideoRef?.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      currentVideoRef?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoRef, showDiaLogTime, setIsDialogVisible, setProgress]);
};
