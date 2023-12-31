import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import './css/main.css'
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
