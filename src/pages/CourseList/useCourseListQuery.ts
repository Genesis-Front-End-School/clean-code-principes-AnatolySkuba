import { useQuery } from 'react-query';
import { getAllCourses } from '../../api/courses.api';
import { ROUTER_KEYS } from '../../utils/constants';

export const useCourseListQuery = () => {
  const { data: courses, isLoading, isError } = useQuery(`${ROUTER_KEYS.COURSES}`, getAllCourses);
  return { courses, isLoading, isError };
};
