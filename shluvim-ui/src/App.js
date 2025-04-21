import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ManageInstructors from './pages/ManageInstructors';
import ManageInstitutes from './pages/ManageInstitutes';
import Reports from './pages/Reports';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Make sure to import the CSS file


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>שלובים</h1>
        </header>
        <hr />
      <div className="centered-frame-main">
      <div className="frame-content-main">
        <nav>
          <Link to="/instructors"><button>ניהול מדריכים</button></Link>
          <Link to="/institutes"><button>ניהול מוסדות</button></Link>
          <Link to="/reports"><button>דוחות</button></Link>
        </nav>
        <Routes>
          <Route path="/instructors" element={<ManageInstructors />} />
          <Route path="/institutes" element={<ManageInstitutes />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
    </div>
    </Router>
  );
}

export default App;