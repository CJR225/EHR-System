import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
