import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ICourse } from '../../../../entities/course';
import { Rating, VideoPlayer } from 'shared/ui';

const CourseCard = ({
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
      className="block relative min-w-fill rounded-lg p-3 pb-9 border shadow-md shadow-gray-500 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={id}>
        <div className="relative h-28 w-64 mx-auto" data-testid="group">
          {isHovered ? (
            <VideoPlayer
              className="absolute top-0 h-full w-full rounded-md object-contain"
              src={meta.courseVideoPreview.link}
              id={id}
              muted
              autoPlay
            />
          ) : (
            <img
              alt={title}
              src={`${previewImageLink}/cover.webp`}
              className="absolute top-0 h-full w-full rounded-md object-contain"
            />
          )}
        </div>
        <div className="mt-1">
          <h2 className="font-medium">{title}</h2>
          <p className="text-sm text-gray-500">{description}</p>

          <div className="mt-1 text-xs">
            <div>
              {meta.skills && (
                <p className="text-gray-500">{`Skills: ${meta.skills.join(', ')}.`}</p>
              )}
              <div className="absolute bottom-3 w-full flex justify-between">
                <Rating rating={rating} />
                <p className="mr-6 text-gray-500">Lessons: {lessonsCount}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default CourseCard;
