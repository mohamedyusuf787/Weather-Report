import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import Weatherapp from './weather.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <App/>
    <Weatherapp/>
  </>
);
