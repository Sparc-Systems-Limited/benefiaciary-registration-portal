import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
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
    
      </Routes>
    </Router>
  );
}

export default App;
