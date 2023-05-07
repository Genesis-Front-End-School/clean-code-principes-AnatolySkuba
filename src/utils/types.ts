export interface ICourses {
  courses: ICourse[];
}

export interface ICourse {
  id: string;
  title: string;
  description: string;
  previewImageLink: string;
  lessonsCount: number;
  lessons?: ILesson[];
  rating: number;
  meta: IMeta;
}

export interface ILesson {
  id: string;
  title: string;
  status: LessonStatus;
  link: string;
  duration: number;
}

interface IMeta {
  skills: string[];
  courseVideoPreview: { link: string };
}

export type Token = {
  token: string;
};

export enum LessonStatus {
  Locked = 'locked',
  Unlocked = 'unlocked',
}

export enum KeyboardButton {
  Comma = 'Comma',
  Period = 'Period',
}
