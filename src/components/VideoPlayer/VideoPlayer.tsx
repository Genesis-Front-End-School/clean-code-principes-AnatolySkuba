import { FC, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { KeyboardButton } from '../../utils/types';

export interface VideoPlayerProps {
  id?: string;
  src: string;
  className?: string;
  muted?: boolean;
  controls?: boolean;
  withPictureInPicture?: boolean;
  autoPlay?: boolean;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({
  id,
  src,
  className,
  muted = false,
  autoPlay = false,
  controls = false,
  withPictureInPicture = false,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const hls = new Hls();
    if (src) {
      hls.loadSource(src);
      if (videoRef.current) {
        hls.attachMedia(videoRef.current);
        videoRef.current.addEventListener('loadedmetadata', () => {
          if (withPictureInPicture) {
            videoRef.current?.requestPictureInPicture();
          }
        });
      }
      const savedTime = localStorage.getItem(`lessonTime ${id}`);

      if (id && savedTime && videoRef && videoRef.current) {
        videoRef.current.currentTime = parseInt(savedTime) || 0;
      }
    }
  }, [videoRef, src, id, withPictureInPicture]);

  // save the video progress to the localStorage
  useEffect(() => {
    if (id) {
      const handleTabClose = () => {
        localStorage.setItem(`lessonTime ${id}`, videoRef.current?.currentTime.toString() || '');
      };

      window.addEventListener('beforeunload', handleTabClose);
      return () => {
        window.removeEventListener('beforeunload', handleTabClose);
      };
    }
  }, [id]);

  // Add a change in video playback using a keyboard
  useEffect(() => {
    const changePlaybackRate = (rate: number) => {
      if (videoRef.current) {
        const newRate = videoRef.current.playbackRate + rate;
        if (newRate >= 0.5 && newRate <= 3.75) {
          videoRef.current.playbackRate = newRate;
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        switch (event.code) {
          case KeyboardButton.Comma:
            changePlaybackRate(-0.25);
            break;
          case KeyboardButton.Period:
            changePlaybackRate(0.25);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <video
      className={className}
      ref={videoRef}
      autoPlay={autoPlay}
      controls={controls}
      muted={muted}
      loop
      data-testid="video-element"
    />
  );
};
