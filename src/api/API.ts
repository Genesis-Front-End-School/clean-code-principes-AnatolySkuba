import axios from 'axios';
import { toast } from 'react-toastify';

import { URL, API_VERSIONS, QUERY_KEYS, STORAGE_KEYS } from '../utils/constants';
import { ICourse, ICourses, QueryKey, Token } from '../utils/types';

export const getCredentials = async () => {
  const url = `${URL}/${API_VERSIONS.V1}/${QUERY_KEYS.AUTH}/${QUERY_KEYS.ANONYMOUS}?platform=subscriptions`;
  try {
    const response = await axios.get<Token>(url);

    localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);
  } catch (error) {
    if (error instanceof Error) toast.error(`Oops, error in getting credentials. ${error.message}`);
  }
};

export const getConfig = async () => {
  if (!localStorage.getItem(STORAGE_KEYS.TOKEN)) await getCredentials();
  return { headers: { Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}` } };
};

export const getAllCourses = async () => {
  const url = `${URL}/${API_VERSIONS.V1}/${QUERY_KEYS.CORE}/${QUERY_KEYS.PREVIEW_COURSES}`;
  try {
    const response = await axios.get<ICourses>(url, await getConfig());

    return response.data.courses;
  } catch (error) {
    if (error instanceof Error) toast.error(`Oops. ${error.message}`);
    return [];
  }
};

export const getCourse = async ({ queryKey }: QueryKey) => {
  const [, queryObject] = queryKey;

  if (typeof queryObject === 'object') {
    const url = `${URL}/${API_VERSIONS.V1}/${QUERY_KEYS.CORE}/${QUERY_KEYS.PREVIEW_COURSES}/${queryObject.courseId}`;
    try {
      const response = await axios.get<ICourse>(url, await getConfig());

      return response.data;
    } catch (error) {
      if (error instanceof Error) toast.error(`Oops. ${error.message}`);
    }
  }
};
