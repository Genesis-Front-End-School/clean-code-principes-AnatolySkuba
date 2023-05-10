import React from 'react';
import { shallow } from 'enzyme';
import { toast } from 'react-toastify';

import { ILesson, LessonStatus } from '../../../../entities/course';

import CourseLesson from '.';

describe('Lesson Component', () => {
  const lesson: ILesson = {
    id: '1',
    title: 'Lesson 1',
    status: LessonStatus.Unlocked,
    link: 'https://www.example.com',
    duration: 0,
  };

  const lockedLesson = {
    ...lesson,
    status: LessonStatus.Locked,
  };

  it('should render lesson title', () => {
    const wrapper = shallow(<CourseLesson {...lesson} />);
    const titleElement = wrapper.find('p').text();

    expect(titleElement).toEqual(lesson.title);
  });

  it('should show lock icon for locked lessons', () => {
    const wrapper = shallow(<CourseLesson {...lockedLesson} />);

    expect(wrapper.find('SlLock')).toHaveLength(1);
  });

  it('should show video player when lesson is clicked', () => {
    const wrapper = shallow(<CourseLesson {...lesson} />);
    wrapper.find('p').simulate('click');

    expect(wrapper.find('VideoPlayer')).toHaveLength(1);
  });

  it('should show error message when locked lesson is clicked', () => {
    const mockToast = jest.spyOn(toast, 'error');

    const wrapper = shallow(<CourseLesson {...lockedLesson} />);
    wrapper.find('p').simulate('click');

    expect(mockToast).toHaveBeenCalledWith('Oops, the lesson is locked!');
  });
});
