import { FcAcceptDatabase, FcUndo } from 'react-icons/fc';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { getCourseById } from '../../api/courses.api';
import { Lesson, VideoPlayer, Loader, Error } from '../../components';
import { ROUTER_KEYS } from '../../utils/constants';
import { ILesson } from '../../utils/types';

export const Course = (): JSX.Element => {
  const navigate = useNavigate();
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId || '';
  const {
    data: course,
    isLoading,
    isError,
  } = useQuery([`${ROUTER_KEYS.COURSES}`, { courseId }], () => getCourseById(courseId));

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !course) {
    return <Error />;
  }

  const { id, title, description, lessons, meta } = course;

  return (
    <div className="p-5 bg-slate-100 h-screen" role="article">
      <FcUndo className="cursor-pointer" onClick={() => navigate(-1)} role="link" />
      <div className="mx-auto bg-white rounded-md">
        <h1 className="p-2 font-medium">{title}</h1>
        <VideoPlayer id={id} src={meta?.courseVideoPreview.link} controls />
      </div>
      <div className="mt-2">
        <p className="text-gray-700">{description}</p>

        <div className="mt-2">
          <div className="flex gap-2 items-center">
            <p className="font-medium">Lessons</p>
            <FcAcceptDatabase size="16" />
          </div>

          <ul>
            {lessons?.map((lesson: ILesson) => (
              <li key={lesson.id}>
                <Lesson {...lesson} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
