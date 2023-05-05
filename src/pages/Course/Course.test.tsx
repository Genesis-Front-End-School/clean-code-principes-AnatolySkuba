import { fireEvent, render, screen } from '@testing-library/react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import '@testing-library/jest-dom';

import { Course } from './Course';

jest.mock('react-query');

const navigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: () => navigate,
}));

jest.mock('../../components/Loader', () => ({
  __esModule: true,
  Loader: () => 'Mocked the Loader Component',
}));

jest.mock('../../components/Error', () => ({
  __esModule: true,
  Error: () => 'Mocked the Error Component',
}));

jest.mock('../../components/Lesson', () => ({
  __esModule: true,
  Lesson: () => 'Mocked the Lesson Component',
}));

jest.mock('../../components/VideoPlayer', () => ({
  __esModule: true,
  VideoPlayer: () => 'Mocked the VideoPlayer Component',
}));

const mockCourse = {
  id: '1',
  title: 'Course Title',
  description: 'Course Description',
  lessons: [
    { id: '1', title: 'Lesson 1', videoUrl: 'https://example.com/lesson1.mp4' },
    { id: '2', title: 'Lesson 2', videoUrl: 'https://example.com/lesson2.mp4' },
  ],
  rating: 4.5,
  meta: {
    skills: ['Skill 1', 'Skill 2'],
    courseVideoPreview: {
      link: 'https://example.com/course-preview.mp4',
    },
  },
};

describe('Course component', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ courseId: '1' });
  });

  afterEach(jest.clearAllMocks);

  it('Displays the loading view', () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });

    render(<Course />);

    expect(screen.getByText(/Mocked the Loader Component/)).toBeInTheDocument();
  });

  it('Displays the Error Component', () => {
    (useQuery as jest.Mock).mockReturnValue({ isError: true });

    render(<Course />);

    expect(screen.getByText(/Mocked the Error Component/)).toBeInTheDocument();
  });

  it('Render Course component correctly', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockCourse,
      isLoading: false,
      isError: false,
    });

    render(<Course />);
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByText(/Mocked the VideoPlayer Component/)).toBeInTheDocument();
  });

  it('calls navigate function with -1 when the undo button is clicked', () => {
    render(<Course />);
    const undoButton = screen.getByRole('link');
    fireEvent.click(undoButton);

    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
