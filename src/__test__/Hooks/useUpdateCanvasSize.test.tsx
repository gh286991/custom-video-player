import { renderHook, act } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import useUpdateCanvasSize from '../../Modules/Canvas/Hooks/useUpdateCanvasSize';

describe('useUpdateCanvasSize', () => {
  let container: HTMLElement;
  let canvas: HTMLCanvasElement;
  let video: HTMLVideoElement;

  beforeEach(() => {
    container = document.createElement('div');
    canvas = document.createElement('canvas');
    video = document.createElement('video');
  });

  it('應當在容器大小更改時更新畫布大小', () => {
    const { rerender } = renderHook(() =>
      useUpdateCanvasSize(canvas, video, container, false),
    );

    jest.spyOn(container, 'clientWidth', 'get').mockImplementation(() => 200);
    jest.spyOn(container, 'clientHeight', 'get').mockImplementation(() => 300);

    act(() => {
      fireEvent(container, new Event('resize'));
    });

    expect(canvas.width).toBe(200);
    expect(canvas.height).toBe(300);

    jest.spyOn(container, 'clientWidth', 'get').mockImplementation(() => 400);
    jest.spyOn(container, 'clientHeight', 'get').mockImplementation(() => 600);

    act(() => {
      fireEvent(container, new Event('resize'));
    });

    expect(canvas.width).toBe(400);
    expect(canvas.height).toBe(600);

    rerender();

    act(() => {
      fireEvent(window, new Event('resize'));
    });

    expect(canvas.width).toBe(400);
    expect(canvas.height).toBe(600);
  });

  it('當容器為null時，不應該更新畫布大小', () => {
    renderHook(() => useUpdateCanvasSize(canvas, video, null, false));

    act(() => {
      fireEvent(window, new Event('resize'));
    });

    expect(canvas.width).not.toBe(200);
    expect(canvas.height).not.toBe(300);
  });
  
});
