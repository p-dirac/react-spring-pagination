import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

window.React1 = require('react');

// root is div id within index.html

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
    <React.StrictMode>
        <BrowserRouter basename="/front">
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
