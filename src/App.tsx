import React, { useState } from 'react';
import HLSPlayer from './Modules/VideoPlayer/HLSPlayer';
import JSONTextArea from './Modules/JsonEdit';
import { IMarqueeConfig } from './Modules/Canvas/Modules';
import marqueeConfig from './config/marquee.json';
import RotatingArrow from './Components/RotatingArrow';

const App: React.FC = () => {

  const [inputValue, setInputValue] = useState<IMarqueeConfig>(marqueeConfig);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleInputChange = (newValue: IMarqueeConfig) => {
    setInputValue(newValue);
  };

  const handleClick = () => {
    setTimeout(()=>{
      setIsCollapsed(!isCollapsed);
    }, 200);
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
          <div  className='titleContainer'>
            <h3>跑馬燈編輯器</h3> 
            <RotatingArrow onClick={handleClick}></RotatingArrow>
          </div>
          {
            !isCollapsed &&   <div
              className={`rotating-arrow-container ${
                isCollapsed ? 'collapsed' : ''
              }`}
            >
              <JSONTextArea<IMarqueeConfig>
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default App;
