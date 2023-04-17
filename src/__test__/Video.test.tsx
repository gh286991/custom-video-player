import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HLSPlayer from '../Components/HLSPlayer';
import Hls from 'hls.js';

const mockedHls = {
  loadSource: jest.fn(),
  attachMedia: jest.fn(),
  on: jest.fn(),
  destroy: jest.fn(),
};
  
jest.spyOn(Hls, 'isSupported').mockReturnValue(true);
jest.spyOn(Hls.prototype, 'loadSource').mockImplementation(mockedHls.loadSource);
jest.spyOn(Hls.prototype, 'attachMedia').mockImplementation(mockedHls.attachMedia);
jest.spyOn(Hls.prototype, 'on').mockImplementation(mockedHls.on);
jest.spyOn(Hls.prototype, 'destroy').mockImplementation(mockedHls.destroy);
  
describe('HLSPlayer', () => {
  const testSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

  it('should render video element with controls', () => {
    const { getByTestId } = render(<HLSPlayer src={testSrc} />);
    const videoElement = getByTestId('video-element');

    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute('controls');
    expect(videoElement).toHaveAttribute('width', '100%');
    expect(videoElement).toHaveAttribute('height', '100%');
  });

  it('should handle HLS playback', async () => {
    const { getByTestId } = render(<HLSPlayer src={testSrc} />);
    const videoElement = getByTestId('video-element');

    fireEvent.loadedMetadata(videoElement);
    await waitFor(() => expect(videoElement).toHaveAttribute('src', testSrc));

    expect(Hls.prototype.loadSource).toHaveBeenCalledWith(testSrc);
    expect(Hls.prototype.attachMedia).toHaveBeenCalledWith(videoElement);
    expect(Hls.prototype.on).toHaveBeenCalled();
  });
});
