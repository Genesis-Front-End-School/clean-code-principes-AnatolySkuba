import { shallow } from 'enzyme';
import { CourseCard } from './CourseCard';
import { VideoPlayer } from '..';
import { ICourse } from '../../utils/types';

jest.mock('hls.js', () => {
  class Hls {
    loadSource() {}
    attachMedia() {}
  }
  return Hls;
});

describe('CourseCard', () => {
  const course: ICourse = {
    id: '1',
    title: 'Test Course',
    description: 'This is a test course',
    previewImageLink: '/test-preview-image',
    lessonsCount: 10,
    rating: 4.5,
    meta: {
      skills: ['React', 'Node.js'],
      courseVideoPreview: {
        link: '/test-video-link',
      },
    },
  };

  it('renders the video player when hovered and the preview image otherwise', () => {
    const wrapper = shallow(<CourseCard {...course} />);
    expect(wrapper.find(VideoPlayer)).toHaveLength(0);
    wrapper.simulate('mouseenter');
    expect(wrapper.find(VideoPlayer)).toHaveLength(1);
    expect(wrapper.find(VideoPlayer).prop('src')).toEqual(course.meta.courseVideoPreview.link);
    wrapper.simulate('mouseleave');
    expect(wrapper.find(VideoPlayer)).toHaveLength(0);
  });
});
