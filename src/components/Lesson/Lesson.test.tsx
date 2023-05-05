import { shallow } from 'enzyme';
import { LessonStatus } from '../../utils/types';
import { Lesson } from './Lesson';
import { toast } from 'react-toastify';

jest.mock('hls.js', () => {
  class Hls {
    loadSource() {}
    attachMedia() {}
  }
  return Hls;
});

describe('Lesson Component', () => {
  const lesson = {
    id: '1',
    title: 'Lesson 1',
    status: 'unlocked',
    link: 'https://www.example.com',
  };

  it('should render lesson title', () => {
    const wrapper = shallow(<Lesson {...lesson} />);
    const titleElement = wrapper.find('p').text();
    expect(titleElement).toEqual(lesson.title);
  });

  it('should show lock icon for locked lessons', () => {
    const lockedLesson = {
      ...lesson,
      status: 'locked',
    };
    const wrapper = shallow(<Lesson {...lockedLesson} />);
    const lockIcon = wrapper.find('SlLock');
    expect(lockIcon).toHaveLength(1);
  });

  it('should show video player when lesson is clicked', () => {
    const wrapper = shallow(<Lesson {...lesson} />);
    wrapper.find('p').simulate('click');
    const videoPlayer = wrapper.find('VideoPlayer');
    expect(videoPlayer).toHaveLength(1);
  });

  it('should show error message when locked lesson is clicked', () => {
    const lockedLesson = {
      id: '1',
      title: 'Introduction',
      status: LessonStatus.Locked,
      link: 'https://example.com',
    };

    const mockToast = jest.spyOn(toast, 'error');

    const wrapper = shallow(<Lesson {...lockedLesson} />);
    wrapper.find('p').simulate('click');

    expect(mockToast).toHaveBeenCalledWith('Oops, the lesson is locked!');
  });
});
