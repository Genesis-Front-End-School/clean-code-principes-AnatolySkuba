import { shallow } from 'enzyme';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { Loader, Error, CourseCard, Pagination } from '../../components';

import { CourseList } from './CourseList';

jest.mock('react-query');
jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('hls.js', () => {
  class Hls {
    loadSource() {}
    attachMedia() {}
  }
  return Hls;
});

describe('CourseList component', () => {
  const courses = [
    { id: 1, title: 'Course 1', description: 'Description 1' },
    { id: 2, title: 'Course 2', description: 'Description 2' },
    { id: 3, title: 'Course 3', description: 'Description 3' },
  ];

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({ data: courses, isLoading: false, isError: false });
    (useSearchParams as jest.Mock).mockReturnValue({ get: jest.fn() });
    const setSearchParams = jest.fn();
    const searchParams = new URLSearchParams('');
    (useSearchParams as jest.Mock).mockImplementation(() => [searchParams, setSearchParams]);
  });

  afterEach(jest.clearAllMocks);

  it('renders the loader when loading', () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });

    const wrapper = shallow(<CourseList />);

    expect(wrapper.find(Loader)).toHaveLength(1);
  });

  it('renders the error when there is an error', () => {
    (useQuery as jest.Mock).mockReturnValue({ isError: true });

    const wrapper = shallow(<CourseList />);

    expect(wrapper.find(Error)).toHaveLength(1);
  });

  it('renders the list of courses when loaded', () => {
    const wrapper = shallow(<CourseList />);

    expect(wrapper.find(CourseCard)).toHaveLength(courses.length);
  });

  it('renders pagination the list of courses when loaded', () => {
    const setSearchParams = jest.fn();
    const searchParams = new URLSearchParams('perPage=2&page=1');
    (useSearchParams as jest.Mock).mockImplementation(() => [searchParams, setSearchParams]);

    const wrapper = shallow(<CourseList />);

    expect(wrapper.find(Pagination)).toHaveLength(1);
  });
});
