import { useQuery } from 'react-query';
import { getCourseById } from '../../api/courses.api';
import { ROUTER_KEYS } from '../../utils/constants';

export const useCourseQuery = (courseId: string) => {
  const { data, isLoading, isError } = useQuery(
    [`${ROUTER_KEYS.COURSES}`, { courseId }],
    getCourseById
  );
  return { course: data, isLoading, isError };
};
