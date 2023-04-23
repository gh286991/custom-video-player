import React, { useState } from 'react';
import HLSPlayer from './Components/HLSPlayer';
import JSONTextArea from './Components/JsonEdit';
import { IJSONObject } from './types/types';
interface IConfig extends IJSONObject  {
  text: string,
}
const config : IConfig = {
  text: 'test' };
     
const App: React.FC = () => {

  const [inputValue, setInputValue] = useState<IConfig>(config);

  const handleInputChange = (newValue: IConfig) => {
    setInputValue(newValue);
    // 在這裡，您可以根據需要處理有效性
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
        />
        <JSONTextArea<IConfig>
          value={inputValue}
          onChange={handleInputChange}
        />
        
      </div>
     
    </div>
  );
};

export default App;
