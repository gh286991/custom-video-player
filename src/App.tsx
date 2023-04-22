import React, { useState } from 'react';
import HLSPlayer from './Components/HLSPlayer';
import { getVimeoHLSUrl } from './Components/utils/getVimeo';
import JSONTextArea from './Components/JsonEdit';

const App: React.FC = () => {

  const videoId = '817692844';
  const accessToken = 'cbf0dd16575ce2e17c5cfbeb79deb0e3';

  const [inputValue, setInputValue] = useState<string>(JSON.stringify({ test:'test' }));

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    // 在這裡，您可以根據需要處理有效性
  };
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
     
      <h1>
        Hello, React 18 with Webpack and TypeScript!
      </h1>
      <div className='container'>
        <HLSPlayer  src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"></HLSPlayer>
        <JSONTextArea value={inputValue}
          onChange={handleInputChange}
        />
      </div>
     
    </div>
  );
};

export default App;
