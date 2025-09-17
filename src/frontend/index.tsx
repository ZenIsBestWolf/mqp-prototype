import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './PrototypeApp';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './scss/custom.scss';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <ToastContainer autoClose={7000} draggable newestOnTop pauseOnFocusLoss />
  </StrictMode>,
);
