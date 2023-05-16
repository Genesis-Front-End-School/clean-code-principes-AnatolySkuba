import { ReactNode, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Loader } from 'shared/ui';

export const withRouter = (component: () => ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>{component()}</Suspense>
    </BrowserRouter>
  );
