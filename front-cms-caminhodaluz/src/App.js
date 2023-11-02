import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AssociadosPage from './pages/AssociadosPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/associados" element={<AssociadosPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;