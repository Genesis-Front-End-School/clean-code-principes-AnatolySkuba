import axios from 'axios';

import { getConfig } from './auth.api';
import { URL, API_VERSIONS, QUERY_KEYS } from '../utils/constants';
import { ICourse, ICourses, QueryKey } from '../utils/types';

export const getAllCourses = async () => {
  const url = `${URL}/${API_VERSIONS.V1}/${QUERY_KEYS.CORE}/${QUERY_KEYS.PREVIEW_COURSES}`;
  try {
    const response = await axios.get<ICourses>(url, await getConfig());

    return response.data.courses;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export const getCourseById = async ({ queryKey }: QueryKey): Promise<ICourse | undefined> => {
  const [, queryObject] = queryKey;
  if (typeof queryObject === 'object') {
    const url = `${URL}/${API_VERSIONS.V1}/${QUERY_KEYS.CORE}/${QUERY_KEYS.PREVIEW_COURSES}/${queryObject.courseId}`;
    try {
      const response = await axios.get<ICourse>(url, await getConfig());

      return response.data;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }
};
