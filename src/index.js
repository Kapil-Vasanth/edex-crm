import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient(); // Create a new QueryClient instance

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> {/* Wrap the App in Router */}
    <QueryClientProvider client={queryClient}> {/* Wrap App with QueryClientProvider */}
        <App />
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
