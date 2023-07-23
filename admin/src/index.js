import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { AutoLogin } from './components/auth/AutoLogin';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AutoLogin />
    </BrowserRouter>
  </React.StrictMode>
);
