import React from "react";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

import AppRouter from "./router/AppRouter";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
    
    // move defaultOptions to separate config file
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
            
            {/* move 2000 to separate constant with clear name */}
            <ToastContainer autoClose={2000} />
        </>
    );
}

export default App;
