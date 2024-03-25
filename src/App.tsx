import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RegisterTokenPage from './RegisterTokenPage';
import KYCPage from './KYCPage';
import AuthPage from './AuthPage';
import TokenRegistrationPage from './TokenRegistrationPage';

function App() {
  return (
    <Router>
      <Routes>
     
      <Route path="/auth"  Component={AuthPage} />
      <Route path="/kyc-page"  Component={KYCPage} />
      <Route path="/"  Component={TokenRegistrationPage} />
      {/* <Route path="/payee-types"  Component={PaymentTypesPage} /> */}
    
      </Routes>
    </Router>
  );
}

export default App;
