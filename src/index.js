import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider.js';
import { RecipientProvider } from './context/RecipientProvider';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <AuthProvider>
      <RecipientProvider>
          <App />
      </RecipientProvider>
    </AuthProvider>
  
);

