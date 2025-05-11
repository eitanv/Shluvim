import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ManageInstructors from './pages/ManageInstructors';
import ManageInstitutes from './pages/ManageInstitutes';
import Reports from './pages/Reports';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Make sure to import the CSS file
import shluvimLogo from './assets/shluvim_logo.avif';



function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={shluvimLogo} alt="Shluvim Logo" style={{ height: '60px' }} />
          </Link>
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
    <div className="lower-frame-main">
            <hr />
              <a href="https://www.shluvim.org.il/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: '20px', textDecoration: 'none', color: 'blue' }}
              >לאתר העמותה</a>
            <p>EVOL Boutique Development House</p>
            <p>כל הזכויות שמורות © 2025</p>
      </div>
    </div>
    </Router>
  );
}

export default App;