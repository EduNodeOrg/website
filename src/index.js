import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./store";
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './tailwind.output.css';
import './index.css';
const helmetContext = {};


createRoot(document.getElementById('root')).render(

  <HelmetProvider context={helmetContext}>
<Provider store={store}>
    <Router>
    <div className="app-wrapper">
    <div className="content-wrapper"> 
   
      <App />
   
      </div>
      </div>
 
    </Router>
    </Provider>
   
  

   </HelmetProvider>
);