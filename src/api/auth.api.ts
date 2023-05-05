import axios from 'axios';

import { URL, API_VERSIONS, QUERY_KEYS, STORAGE_KEYS } from '../utils/constants';
import { Token } from '../utils/types';

export const getCredentials = async () => {
  const url = `${URL}/${API_VERSIONS.V1}/${QUERY_KEYS.AUTH}/${QUERY_KEYS.ANONYMOUS}?platform=subscriptions`;
  try {
    const response = await axios.get<Token>(url);

    localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);
  } catch (error) {
    if (error instanceof Error)
      throw new Error(`Oops, error in getting credentials. ${error.message}`);
  }
};

export const getConfig = async () => {
  if (!localStorage.getItem(STORAGE_KEYS.TOKEN)) await getCredentials();

  return { headers: { Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}` } };
};
