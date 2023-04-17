import axios from "axios";
import { toast } from "react-toastify";

import { URL, API_VERSIONS, QUERY_KEYS, STORAGE_KEYS } from "../utils/constants";

export const getCredentials = async () => {
    const url = `${URL}/${API_VERSIONS.V1}/${QUERY_KEYS.AUTH}/${QUERY_KEYS.ANONYMOUS}?platform=subscriptions`;
    try {
        const response = await axios.get(url);
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.data?.token);
    } catch (error) {
        if (error instanceof Error)
            toast.error(`Oops, error in getting credentials. ${error.message}`);
    }
};

export const getConfig = async () => {
    if (!localStorage.getItem(STORAGE_KEYS.TOKEN)) await getCredentials();
    return { headers: { Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}` } };
};

export const getAllCourses = async () => {
    const url = `${URL}/${API_VERSIONS.V1}/${QUERY_KEYS.CORE}/${QUERY_KEYS.PREVIEW_COURSES}`;
    try {
        const response = await axios.get(url, await getConfig());
        return response;
    } catch (error) {
        if (error instanceof Error) toast.error(`Oops. ${error.message}`);
    }
};

/*
{ queryKey: (string | { courseId: string })[] }
1. Strange interface. I think it should be more strict. 
2. If there is a reason to use it I think you need to move it to separate interface for better readability
*/

export const getCourse = async ({ queryKey }: { queryKey: (string | { courseId: string })[] }) => {
    const [, courseId] = queryKey;
    // Probably you need to use another naming instead of courseId. 
    // courseId expecting to be a number or string, isn't it? 
    // But you compare it with object. It's a bit confusing.  
    if (typeof courseId === "object") {
        const url = `${URL}/${API_VERSIONS.V1}/${QUERY_KEYS.CORE}/${QUERY_KEYS.PREVIEW_COURSES}/${courseId.courseId}`;
        try {
            const response = await axios.get(url, await getConfig());
            return response;
        } catch (error) {
            if (error instanceof Error) toast.error(`Oops. ${error.message}`);
        }
    }
};
