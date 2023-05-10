import { Suspense } from 'react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import { queryClient } from 'shared/config';
import { Loader } from 'shared/ui';

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <QueryClientProvider client={queryClient}>{component()}</QueryClientProvider>
      </Suspense>
    </BrowserRouter>
  );
