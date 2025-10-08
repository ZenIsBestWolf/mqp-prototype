import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ToastContainer } from 'react-toastify';
import './index.scss';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <ToastContainer autoClose={3000} draggable newestOnTop />
  </>,
);
