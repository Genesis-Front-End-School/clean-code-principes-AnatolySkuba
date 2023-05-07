import { FC, useState } from 'react';
import { FcStart } from 'react-icons/fc';
import { SlLock } from 'react-icons/sl';
import { toast } from 'react-toastify';

import { ILesson, LessonStatus } from '../../utils/types';
import { VideoPlayer } from '../../components';

interface ILessonProps extends ILesson {
  id: string;
  title: string;
  status: LessonStatus;
  link: string;
}

export const Lesson: FC<ILessonProps> = ({ id, title, status, link }): JSX.Element => {
  const [idPictureInPicture, setIdPictureInPicture] = useState<string | null>(null);

  const handleLesson = () => {
    status === LessonStatus.Locked
      ? toast.error('Oops, the lesson is locked!')
      : setIdPictureInPicture(id);
  };

  return (
    <>
      <p
        className="flex items-center gap-3 cursor-pointer text-blue-800 hover:font-semibold hover:ml-2"
        onClick={() => handleLesson()}
        role="button"
      >
        {title}
        {id === idPictureInPicture && <FcStart className="animate-pulse" />}
      </p>

      {status === 'locked' && <SlLock size="10" color="red" />}
      {id === idPictureInPicture && (
        <>
          <VideoPlayer src={link} id={id} controls autoPlay withPictureInPicture />
          <p>Press "Ctrl + &#62;" to increase speed, press "Ctrl + &lt;" to slow down playback</p>
        </>
      )}
    </>
  );
};
