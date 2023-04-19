import React from 'react';
import { ToastContainer } from 'react-toastify';
import { QueryClientProvider } from 'react-query';

import AppRouter from './router/AppRouter';
import { queryClient } from './configs/queryClient';
import { AUTO_CLOSE_TOAST } from './utils/constants';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
      <ToastContainer autoClose={AUTO_CLOSE_TOAST} />
    </>
  );
}

export default App;

