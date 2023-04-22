import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import JSONTextArea from '../components/JsonEdit';

describe('JSONTextArea', () => {

  test('當輸入有效的 JSON 格式時，onChange 函數以正確的參數被調用', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <JSONTextArea
        value={''}
        onChange={onChange}
      />,
    );
    const input = getByPlaceholderText('輸入 JSON 格式的數據...');

    fireEvent.change(input, { target: { value: '{"hello": "world"}' } });
    
    expect(onChange).toHaveBeenCalledWith('{"hello": "world"}', true);
  });
    
  test('當輸入無效的 JSON 格式時，onChange 函數以正確的參數被調用', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <JSONTextArea
        value={''}
        onChange={onChange}
      />,
    );
    const input = getByPlaceholderText('輸入 JSON 格式的數據...') as HTMLTextAreaElement;

    fireEvent.change(input, { target: { value: '{badjson}' } });
    
    expect(onChange).toHaveBeenCalledWith('{badjson}', false);
  });
    
  test('當以 value 屬性傳入數據時，textarea 正確顯示', () => {
    const onChange = jest.fn();
    render(
      <JSONTextArea
        value={'{"hello": "world"}'}
        onChange={onChange}
      />,
    );
    const input = screen.getByPlaceholderText('輸入 JSON 格式的數據...') as HTMLTextAreaElement;
   
    expect(input.value).toBe('{"hello": "world"}');
  });
    
  test('textarea 顯示正確的行數和列數', () => {
    const onChange = jest.fn();
    render(
      <JSONTextArea
        value={''}
        onChange={onChange}
        rows={20}
        cols={40}
      />,
    );
    const input = screen.getByPlaceholderText('輸入 JSON 格式的數據...') as HTMLTextAreaElement;
 
    expect(input.rows).toBe(20);
    expect(input.cols).toBe(40);
  });
    
  it('當輸入無效的 JSON 並離開 textarea 時，不應該呼叫 onChange 並以格式化的 JSON 做為參數', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <JSONTextArea value=""
        onChange={handleChange}
      />,
    );

    const textarea = getByPlaceholderText('輸入 JSON 格式的數據...');
    fireEvent.change(textarea, {
      target: { value: '{ "key": "value", }' },
    });
    
    fireEvent.blur(textarea);
    
    expect(handleChange).not.toHaveBeenCalledWith(
      '{\n  "key": "value"\n}',
      true,
    );
  });
    
  it('當輸入無效的 JSON 並離開 textarea 時，不應該格式化 JSON 並呼叫 onChange 函數', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <JSONTextArea value=""
        onChange={handleChange}
      />,
    );
 
    const textarea = getByPlaceholderText('輸入 JSON 格式的數據...');
    fireEvent.change(textarea, {
      target: { value: '{ "key": "value", }' },
    });

    fireEvent.blur(textarea);
    
    // 預期 handleChange 不會以格式化的 JSON 當參數被呼叫
    expect(handleChange).not.toHaveBeenCalledWith('{\n  "key": "value"\n}', false);
  });
    
});
    