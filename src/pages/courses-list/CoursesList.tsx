import React from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import { Pagination } from '../../features';
import { ICourse } from '../../entities/course';
import { CourseCard } from '../../entities/course';
import { getCoursesList } from '../../entities/course';
import { Loader, Error } from 'shared/ui';
import { ROUTER_KEYS, COURSES_PER_PAGE } from 'shared/consts';

const CoursesList = () => {
  const [searchParams] = useSearchParams();
  const perPage = Number(searchParams.get('perPage')) || COURSES_PER_PAGE.Ten;
  const currentPage = Number(searchParams.get('page')) || 1;
  const { data: courses, isLoading, isError } = useQuery(`${ROUTER_KEYS.COURSES}`, getCoursesList);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !courses) {
    return <Error />;
  }

  const pagesTotal = Math.ceil(courses.length / perPage);
  const currentPageCourses: ICourse[] = [];
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

export default CoursesList;
