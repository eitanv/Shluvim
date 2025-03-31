import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import '../styles.css'; // Make sure to import the CSS file


function Reports() {
  const [reports, setReports] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState('');
  const [month, setMonth] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch institutes and set the first one as selected
    fetch(`${process.env.REACT_APP_API_BASE_URL}/institutes/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched institutes:', data); // Log fetched institutes
        setInstitutes(data);
        if (data.length > 0) {
          const firstInstituteId = data[0].instituteId;
          setSelectedInstitute(firstInstituteId);
          const currentMonth = new Date().toISOString().slice(0, 7); // Get current month in YYYY-MM format
          setMonth(currentMonth);
          // Fetch reports for the first institute and current month
          fetchReports(firstInstituteId, currentMonth);
        }
      })
      .catch(error => {
        console.error('Error fetching institutes:', error);
        setError(error.message);
      });
  }, []);

  const fetchReports = (instituteId, month) => {
    if (instituteId && month) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/reports/${instituteId}/${month}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (Array.isArray(data)) {
            setReports(data);
          } else {
            setReports([]);
          }
        })
        .catch(error => {
          console.error('Error fetching reports:', error);
          setError(error.message);
        });
    }
  };

  useEffect(() => {
    if (selectedInstitute && month) {
      fetchReports(selectedInstitute, month);
    }
  }, [selectedInstitute, month]);

  const logNewReport = () => {
    // Logic to log new report
  };

  return (
  <div className="centered-frame">
  <div className="frame-content">
    <div>
      <h2>Reports</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <select onChange={e => setSelectedInstitute(e.target.value)} value={selectedInstitute}>
        {institutes.map(institute => (
          <option key={institute.instituteId} value={institute.instituteId}>
            {institute.instituteName}
          </option>
        ))}
      </select>
      <input type="month" onChange={e => setMonth(e.target.value)} value={month} />
      <button onClick={logNewReport}>Log New Report</button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Hours</th>
            <th>Charge</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id}>
              <td>{report.instituteName}</td>
              <td>{report.totalHours}</td>
              <td>{report.totalCharge}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </div>
  </div>
  );
}

export default Reports;