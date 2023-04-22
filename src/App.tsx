import React from 'react';
import HLSPlayer from './Components/HLSPlayer';
import { getVimeoHLSUrl } from './Components/utils/getVimeo';

const App: React.FC = () => {

  const videoId = '817692844';
  const accessToken = 'cbf0dd16575ce2e17c5cfbeb79deb0e3';

  getVimeoHLSUrl(videoId, accessToken)
    .then(hlsUrl => {
      if (hlsUrl) {
        console.log('HLS URL:', hlsUrl);
      } else {
        console.log('HLS URL not found');
      }
    })
    .catch(error => {
      console.error('Error fetching video information:', error);
    });

  return (
    <div>
      <h1>Hello, React 18 with Webpack and TypeScript!
      </h1>
      <HLSPlayer  src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"></HLSPlayer>

    </div>
  );
};

export default App;
