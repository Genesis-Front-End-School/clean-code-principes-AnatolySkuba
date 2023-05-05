import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CourseList } from './CourseList';
import { useCourseListQuery } from './useCourseListQuery';
import { renderWithRouter } from '../../tests/helpers/renderWithRouter';

const mockedUseCourseListQuery = useCourseListQuery as jest.Mock;
jest.mock('./useCourseListQuery');

jest.mock('hls.js', () => {
  class Hls {
    loadSource() {}
    attachMedia() {}
  }
  return Hls;
});

jest.mock('../../components/Loader', () => ({
  __esModule: true,
  Loader: () => 'Mocked the Loader Component',
}));

jest.mock('../../components/Error', () => ({
  __esModule: true,
  Error: () => 'Mocked the Error Component',
}));

jest.mock('../../components/CourseCard', () => ({
  __esModule: true,
  CourseCard: () => 'Mocked the CourseCard Component',
}));

jest.mock('../../components/Pagination', () => ({
  __esModule: true,
  Pagination: () => 'Mocked the Pagination Component',
}));

const MockData = [
  { id: 1, title: 'Course 1' },
  { id: 2, title: 'Course 2' },
  { id: 3, title: 'Course 3' },
  { id: 4, title: 'Course 4' },
  { id: 5, title: 'Course 5' },
  { id: 6, title: 'Course 6' },
  { id: 7, title: 'Course 7' },
  { id: 8, title: 'Course 8' },
  { id: 9, title: 'Course 9' },
  { id: 10, title: 'Course 10' },
  { id: 11, title: 'Course 11' },
];

describe('CourseList component', () => {
  afterEach(jest.clearAllMocks);

  it('Displays the loading view', () => {
    mockedUseCourseListQuery.mockImplementation(() => ({
      isLoading: true,
    }));

    renderWithRouter(<CourseList />);

    expect(screen.getByText(/Mocked the Loader Component/)).toBeTruthy();
  });

  it('Displays the Error Component', () => {
    mockedUseCourseListQuery.mockImplementation(() => ({
      isError: true,
    }));

    renderWithRouter(<CourseList />);

    console.log(83, screen.debug());

    expect(screen.getByText(/Mocked the Error Component/)).toBeTruthy();
  });

  it('Render CourseList correctly', () => {
    mockedUseCourseListQuery.mockImplementation(() => ({
      courses: MockData,
    }));

    renderWithRouter(<CourseList />);
    console.log(91, screen.debug());

    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });
});
