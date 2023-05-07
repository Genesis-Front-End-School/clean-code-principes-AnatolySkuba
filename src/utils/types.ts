<<<<<<< HEAD
export type Course = {
    id: string;
    title: string;
    description: string;
    previewImageLink: string;
    lessonsCount: number;
    rating: number;
    meta: {
        skills: string[];
        courseVideoPreview: { link: string };
    };
};

export type Lesson = {
    id: string;
    title: string;
    status: string;
};
=======
export interface ICourse {
  id: string;
  title: string;
  description: string;
  previewImageLink: string;
  lessonsCount: number;
  rating: number;
  meta: IMeta;
}

interface IMeta {
  skills: string[];
  courseVideoPreview: { link: string };
}

export interface ILesson {
  id: string;
  title: string;
  status: string;
  link: string;
}

export enum LessonStatus {
  Locked = 'locked',
  Unlocked = 'unlocked',
}

export enum KeyboardButton {
  Comma = 'Comma',
  Period = 'Period',
}

export interface IQueryKey {
  queryKey: (string | { courseId: string })[];
}
>>>>>>> b21e8e224cbdf05c4789e8343bb9e4637cc0a677
