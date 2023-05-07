import { useSearchParams } from 'react-router-dom';

import { CourseCard, Pagination, Loader, Error } from '../../components';
import { COURSES_PER_PAGE } from '../../utils/constants';
import { ICourse } from '../../utils/types';
import { useCourseListQuery } from './useCourseListQuery';

export const CourseList = () => {
  const [searchParams] = useSearchParams();
  const perPage = Number(searchParams.get('perPage')) || COURSES_PER_PAGE.Ten;
  const { courses, isLoading, isError } = useCourseListQuery();

  const currentPage = Number(searchParams.get('page')) || 1;

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !courses) {
    return <Error />;
  }

  const pagesTotal = Math.ceil(courses.length / perPage);
  const currentPageCourses = courses.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <>
      <ul
        className="grid gap-5 p-5 justify-items-center tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4"
        role="listbox"
      >
        {currentPageCourses.map((course: ICourse) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </ul>

      {pagesTotal > 1 && <Pagination coursesTotal={courses.length} />}
    </>
  );
};
