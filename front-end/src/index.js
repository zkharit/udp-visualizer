import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // ToDo: uncomment Strict Mode (need to separate source/destination side first)
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);
