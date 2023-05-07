import React from 'react';
import { shallow } from 'enzyme';
import { FcUndo } from 'react-icons/fc';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { Loader, Error } from '../../components';
import { ICourse, LessonStatus } from '../../utils/types';
import { Course } from './Course';

jest.mock('react-query');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));
jest.mock('../../api/courses.api');

describe('Course component', () => {
  const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
  const mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;

  const course: ICourse = {
    id: '1',
    title: 'Test Course',
    description: 'A course for testing purposes',
    lessons: [
      {
        id: '1',
        title: 'Test Lesson',
        status: LessonStatus.Unlocked,
        link: '',
        duration: 120,
      },
    ],
    meta: {
      skills: [''],
      courseVideoPreview: {
        link: 'https://www.example.com/video.mp4',
      },
    },
    previewImageLink: '',
    lessonsCount: 0,
    rating: 0,
  };

  beforeEach(() => {
    mockUseParams.mockReturnValue({ courseId: '1' });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders Loader while fetching data', () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });

    const wrapper = shallow(<Course />);

    expect(wrapper.find(Loader)).toHaveLength(1);
  });

  it('renders Error component if there is an error or no data returned', () => {
    (useQuery as jest.Mock).mockReturnValue({ isError: true });

    const wrapper = shallow(<Course />);

    expect(wrapper.find(Error)).toHaveLength(1);
  });

  it('renders course data', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: course });

    const wrapper = shallow(<Course />);

    expect(wrapper.find('[role="article"]')).toHaveLength(1);
  });

  it('calls navigate function on undo icon click', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: {} });
    const navigateMock = jest.fn();
    mockUseNavigate.mockReturnValue(navigateMock);

    const wrapper = shallow(<Course />);
    wrapper.find(FcUndo).simulate('click');

    expect(navigateMock).toHaveBeenCalledWith(-1);
  });

  it('should set courseId to an empty string if params.courseId is falsy', () => {
    mockUseParams.mockReturnValue({ courseId: '' });
    (useQuery as jest.Mock).mockReturnValue({ data: {} });

    const wrapper = shallow(<Course />);

    expect(wrapper.find('[role="article"]')).toHaveLength(1);
  });
});
