import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import '@testing-library/jest-dom';

import { LocalStorageMock } from 'shared/lib/tests/helpers/mockLocalStorage';
import { KeyboardButton } from 'shared/types';
import VideoPlayer from '.';

declare const global: any;

class MockHTMLVideoElement {
  currentTime: number = 0;
  requestPictureInPicture = jest.fn();
}

Object.defineProperty(global, 'HTMLVideoElement', {
  value: MockHTMLVideoElement,
});

describe('VideoPlayer', () => {
  const props = {
    id: '1',
    src: 'https://example.com/video.m3u8',
    className: 'test-class',
    withPictureInPicture: true,
    controls: true,
    muted: true,
  };
  const savedTime = '123';

  beforeAll(() => {
    global.localStorage = new LocalStorageMock();
  });

  beforeEach(() => {
    localStorage.getItem = jest.fn().mockReturnValue(savedTime);
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  afterAll(() => {
    global.localStorage = undefined;
  });

  it('renders a video element with default props', () => {
    const wrapper = shallow(<VideoPlayer {...props} />);
    const videoElement = wrapper.find('video');

    expect(videoElement.exists()).toBe(true);
  });

  it('should update the playback rate when the keyboard shortcut is used', () => {
    render(<VideoPlayer {...props} />);
    const videoElement = screen.getByTestId('video-element') as HTMLVideoElement;

    expect(videoElement.playbackRate).toBe(1);
    fireEvent.keyDown(videoElement, { ctrlKey: true, code: KeyboardButton.Period });

    expect(videoElement.playbackRate).toBe(1.25);
    fireEvent.keyDown(videoElement, { ctrlKey: true, code: KeyboardButton.Comma });

    expect(videoElement.playbackRate).toBe(1);
  });

  it('should save the current lesson time to localStorage when the component unmounts', () => {
    const localStorageSetItemSpy = jest.spyOn(localStorage, 'setItem');

    render(<VideoPlayer {...props} />);
    const videoElement = screen.getByTestId('video-element') as HTMLVideoElement;
    const event = new window.Event('beforeunload', { bubbles: true });
    document.dispatchEvent(event);

    expect(localStorageSetItemSpy).toHaveBeenCalledWith(
      `lessonTime ${props.id}`,
      videoElement.currentTime.toString()
    );
  });

  it('requests picture-in-picture mode when withPictureInPicture prop is true', () => {
    const requestPictureInPictureMock = jest.fn();
    HTMLVideoElement.prototype.requestPictureInPicture = requestPictureInPictureMock;

    render(<VideoPlayer {...props} />);
    const videoElement = screen.getByTestId('video-element') as HTMLVideoElement;
    const event = new window.Event('loadedmetadata', { bubbles: true });
    videoElement.dispatchEvent(event);

    expect(requestPictureInPictureMock).not.toHaveBeenCalled();
  });

  it('should save the current lesson time to localStorage when the component mounts', () => {
    render(<VideoPlayer {...props} />);
    const videoElement = screen.getByTestId('video-element') as HTMLVideoElement;

    expect(videoElement.currentTime).toBe(+savedTime);
  });
});
