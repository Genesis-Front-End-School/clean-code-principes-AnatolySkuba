// Why do you use type instead of interface?
export type Course = {
    id: string;
    title: string;
    description: string;
    previewImageLink: string;
    lessonsCount: number;
    rating: number;
    // Better to use another interface for meta field. Same for courseVideoPreview field
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
