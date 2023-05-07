<<<<<<< HEAD
import { useQuery } from "react-query";
import { getCourse } from "../../services/API";
import { ROUTER_KEYS } from "../../utils/constants";

export const useCourseQuery = (courseId: string) => {
    const { data, isLoading, isError } = useQuery(
        [`${ROUTER_KEYS.COURSES}`, { courseId }],
        getCourse
    );
    return { data, isLoading, isError };
=======
import { useQuery } from 'react-query';
import { getCourse } from '../../api/API';
import { ROUTER_KEYS } from '../../utils/constants';

export const useCourseQuery = (courseId: string) => {
  const { data, isLoading, isError } = useQuery(
    [`${ROUTER_KEYS.COURSES}`, { courseId }],
    getCourse
  );
  return { course: data, isLoading, isError };
>>>>>>> b21e8e224cbdf05c4789e8343bb9e4637cc0a677
};
