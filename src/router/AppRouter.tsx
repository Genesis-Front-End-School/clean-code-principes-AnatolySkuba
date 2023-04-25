<<<<<<< HEAD
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { CourseList, Course } from "../pages";
import { ROUTER_KEYS } from "../utils/constants";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={ROUTER_KEYS.COURSES} element={<CourseList />} />
            <Route path={`${ROUTER_KEYS.COURSE}/:courseId`} element={<Course />} />
            <Route path="*" element={<Navigate to={ROUTER_KEYS.COURSES} replace={true} />} />
        </Routes>
    );
=======
import { Routes, Route, Navigate } from 'react-router-dom';

import { CourseList, Course } from '../pages';
import { ROUTER_KEYS } from '../utils/constants';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTER_KEYS.COURSES} element={<CourseList />} />
      <Route path={`${ROUTER_KEYS.COURSES}/:courseId`} element={<Course />} />
      <Route path="*" element={<Navigate to={ROUTER_KEYS.COURSES} replace={true} />} />
    </Routes>
  );
>>>>>>> b21e8e224cbdf05c4789e8343bb9e4637cc0a677
};

export default AppRouter;
