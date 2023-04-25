<<<<<<< HEAD
import { useQuery } from "react-query";
import { getAllCourses } from "../../services/API";
import { ROUTER_KEYS } from "../../utils/constants";

export const useCourseListQuery = () => {
    const { data, isLoading, isError } = useQuery(`${ROUTER_KEYS.COURSES}`, getAllCourses);
    return { data, isLoading, isError };
=======
import { useQuery } from 'react-query';
import { getAllCourses } from '../../api/API';
import { ROUTER_KEYS } from '../../utils/constants';

export const useCourseListQuery = () => {
  const { data, isLoading, isError } = useQuery(`${ROUTER_KEYS.COURSES}`, getAllCourses);
  return { data, isLoading, isError };
>>>>>>> b21e8e224cbdf05c4789e8343bb9e4637cc0a677
};
