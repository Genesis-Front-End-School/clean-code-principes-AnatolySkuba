import { useSearchParams as useReactRouterSearchParams } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { useQuery } from 'react-query';
import '@testing-library/jest-dom';

import { CourseList } from './CourseList';

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

jest.mock('react-query');

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

const mockData = [
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
  beforeEach(() => {
    // Reset the mock implementation before each test
    (useReactRouterSearchParams as jest.Mock).mockReset();

    // Mock the return value of useSearchParams
    const mockSearchParams = new URLSearchParams('perPage=10&page=1');
    (useReactRouterSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);
  });

  afterEach(jest.clearAllMocks);

  it('Displays the loading view', () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });

    render(<CourseList />);

    expect(screen.getByText(/Mocked the Loader Component/)).toBeInTheDocument();
  });

  it('Displays the Error Component', () => {
    (useQuery as jest.Mock).mockReturnValue({ isError: true });

    render(<CourseList />);

    expect(screen.getByText(/Mocked the Error Component/)).toBeInTheDocument();
  });

  it('Render CourseList correctly', async () => {
    (useQuery as jest.Mock).mockReturnValue({ data: mockData, isLoading: false, isError: false });

    render(<CourseList />);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });
});
