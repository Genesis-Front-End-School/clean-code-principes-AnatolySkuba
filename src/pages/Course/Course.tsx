import { FcAcceptDatabase, FcPositiveDynamic, FcUndo, FcVoicePresentation } from 'react-icons/fc';
import { useNavigate, useParams } from 'react-router-dom';

import { useCourseQuery } from './useCourseQuery';
import { Lesson, VideoPlayer, Loader, Error } from '../../components';
import { ILesson } from '../../utils/types';

export const Course = (): JSX.Element => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const { course, isLoading, isError } = useCourseQuery(courseId!);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }
  console.log(20, course);

  const { id, title, description, lessons, rating, meta } = course;

  return (
    <div className="p-5 bg-slate-100 h-screen" data-testid="course-page">
      <FcUndo className="cursor-pointer" onClick={() => navigate(-1)} role="link" />
      <div className="mx-auto">
        <VideoPlayer id={id} src={meta.courseVideoPreview?.link} controls />
      </div>
      <div className="mt-2">
        <h1 className="text-xl font-medium">{title}</h1>
        <p className="text-gray-700">{description}</p>

        <div className="flex items-center justify-around text-xs">
          <div className="mt-1.5">
            <p className="text-gray-500">Rating</p>
            <p className="flex font-medium gap-1">
              <FcPositiveDynamic size="16" />
              {rating}
            </p>
          </div>

          <div className="mt-1.5">
            <div className="flex gap-2">
              <p className="text-gray-500">Skills</p>
              <FcVoicePresentation size="16" />
            </div>
            <ul>
              {meta.skills ? (
                meta.skills?.map((skill: string, index: number) => (
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
