import React, { useState } from 'react';
import HLSPlayer from './Modules/VideoPlayer/HLSPlayer';
import JSONTextArea from './Modules/JsonEdit';
import { IMarqueeConfig } from './Modules/Canvas/Modules';
import marqueeConfig from './config/marquee.json';
import RotatingArrow from './Components/RotatingArrow';

const App: React.FC = () => {

  const [inputValue, setInputValue] = useState<IMarqueeConfig>(marqueeConfig);

  const handleInputChange = (newValue: IMarqueeConfig) => {
    setInputValue(newValue);
  };

  return (
    <div>
      <h1>
        Hello, React 18 with Webpack and TypeScript!
      </h1>
      <div className='container'>
        <HLSPlayer  
          src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
          marqueeText={inputValue.text}
          marqueeConfig={inputValue}
        />
        <div>
          <h3>跑馬燈編輯器</h3> 
          <RotatingArrow></RotatingArrow>
          <JSONTextArea<IMarqueeConfig>
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
