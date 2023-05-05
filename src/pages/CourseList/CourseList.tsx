import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { getAllCourses } from '../../api/courses.api';

import { CourseCard, Error, Loader, Pagination } from '../../components';
import { COURSES_PER_PAGE, ROUTER_KEYS } from '../../utils/constants';
import { ICourse } from '../../utils/types';
// import { useCourseListQuery } from './useCourseListQuery';

export const CourseList = () => {
  const [searchParams] = useSearchParams();
  const perPage = Number(searchParams.get('perPage')) || COURSES_PER_PAGE.Ten;
  const currentPage = Number(searchParams.get('page')) || 1;
  // const { courses, isLoading, isError } = useCourseListQuery();
  const { data: courses, isLoading, isError } = useQuery(`${ROUTER_KEYS.COURSES}`, getAllCourses);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !courses) {
    return <Error />;
  }

  const pagesTotal = Math.ceil(courses.length / perPage);
  // const currentPageCourses = courses.slice((currentPage - 1) * perPage, currentPage * perPage);
  const currentPageCourses = [];
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;
  for (let i = startIndex; i < endIndex && i < courses.length; i++) {
    currentPageCourses.push(courses[i]);
  }

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
