<<<<<<< HEAD
import React from "react";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

import AppRouter from "./router/AppRouter";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            keepPreviousData: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            cacheTime: Infinity,
        },
    },
});

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AppRouter />
            </QueryClientProvider>
            <ToastContainer autoClose={2000} />
        </>
    );
}

export default App;
=======
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

>>>>>>> b21e8e224cbdf05c4789e8343bb9e4637cc0a677
