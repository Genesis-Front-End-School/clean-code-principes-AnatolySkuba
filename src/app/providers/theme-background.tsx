import { ReactNode } from 'react';

export const themeBackground = (component: () => ReactNode) => () =>
  (
    <div className="bg-black bg-opacity-5 dark:bg-opacity-100 duration-700 flex flex-col min-h-screen">
      {component()}
    </div>
  );
