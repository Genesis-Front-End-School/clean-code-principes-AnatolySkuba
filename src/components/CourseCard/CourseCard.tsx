import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcAcceptDatabase, FcPositiveDynamic, FcVoicePresentation } from 'react-icons/fc';

import { ICourse } from '../../utils/types';
import { VideoPlayer } from '../';

export const CourseCard = ({
  id,
  title,
  description,
  previewImageLink,
  lessonsCount,
  rating,
  meta,
}: ICourse): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className="block min-w-fill rounded-lg p-3 border shadow-md shadow-gray-500 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={id}>
        <div className="relative h-28 w-64 mx-auto" data-testid="group">
          {isHovered ? (
            <div className="absolute top-0 h-full w-full rounded-md object-cover">
              <VideoPlayer src={meta.courseVideoPreview?.link} id={id} muted autoPlay />
            </div>
          ) : (
            <img
              alt={title}
              src={`${previewImageLink}/cover.webp`}
              className="absolute top-0 h-full w-full rounded-md object-cover"
            />
          )}
        </div>
        <div className="mt-1">
          <p className="font-medium">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>

          <div className="flex items-center gap-3 mt-1 text-xs">
            <div>
              <p className="text-gray-500">Lessons</p>
              <p className="flex font-medium gap-1">
                <FcAcceptDatabase size="16" />
                {lessonsCount}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Rating</p>
              <p className="flex font-medium gap-1">
                <FcPositiveDynamic size="16" />
                {rating}
              </p>
            </div>

            <div>
              <div className="flex gap-2">
                <p className="text-gray-500">Skills</p>
                <FcVoicePresentation size="16" />
              </div>
              <ul>
                {meta.skills ? (
                  meta.skills?.map((skill, index) => (
                    <li key={index}>
                      <p className="w-50 font-medium">{skill}</p>
                    </li>
                  ))
                ) : (
                  <li>
                    <p>?</p>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
