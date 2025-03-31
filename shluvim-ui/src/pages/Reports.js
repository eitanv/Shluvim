import React, { useState, useEffect } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import '../styles.css'; // Make sure to import the CSS file

function Reports() {
  const [reports, setReports] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState('');
  const [month, setMonth] = useState('');
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

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
  if (month) {
    const url = instituteId ?
      `${process.env.REACT_APP_API_BASE_URL}/reports/${instituteId}/${month}` :
      `${process.env.REACT_APP_API_BASE_URL}/reports/all/${month}`;
    fetch(url)
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

  const generateReport = () => {
    if (selectedInstitute && month) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/reports/${selectedInstitute}/${month}`, {
        method: 'POST',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Report generated:', data);
          fetchReports(selectedInstitute, month); // Refresh the table
        })
        .catch(error => {
          console.error('Error generating report:', error);
          setError(error.message);
        });
    }
  };

    const handleShowDetails = (report, month) => {
      if (!month) {
        console.error('Month is undefined');
        setError('Month is undefined');
        return;
      }

      fetch(`${process.env.REACT_APP_API_BASE_URL}/reports/${report.instituteId}/${month}/details`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setSelectedReport({ ...report, details: data });
          setShowDetails(true);
        })
        .catch(error => {
          console.error('Error fetching report details:', error);
          setError(error.message);
        });
    };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedReport(null);
  };

  return (
    <div className="centered-frame">
      <div className="frame-content">
        <div>
          <h2>Reports</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <select onChange={e => setSelectedInstitute(e.target.value)} value={selectedInstitute}>
            <option value="">All</option>

            {institutes.map(institute => (
              <option key={institute.instituteId} value={institute.instituteId}>
                {institute.instituteName}
              </option>
            ))}
          </select>
          <input type="month" onChange={e => setMonth(e.target.value)} value={month} />
          <button onClick={generateReport}>Generate Report</button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Hours</th>
                <th>Charge</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(report => (
                <tr key={report.id}>
                  <td>{report.instituteName}</td>
                  <td>{report.totalHours}</td>
                  <td>{report.totalCharge}</td>
                  <td>
                      <Button onClick={() => handleShowDetails(report, month)}>Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={showDetails} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Report Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReport && (
            <div>
              <p><strong>Institute Name:</strong> {selectedReport.instituteName}</p>
              <p><strong>Total Hours:</strong> {selectedReport.totalHours}</p>
              <p><strong>Total Charge:</strong> {selectedReport.totalCharge}</p>
              <h5>Instructor Details:</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Instructor Name</th>
                    <th>Total Instructor Hours</th>
                    <th>Total Instructor Charge</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(selectedReport.details) && selectedReport.details.map((detail, index) => (
                    <tr key={index}>
                      <td>{detail.instructorName}</td>
                      <td>{detail.totalInstructorHours}</td>
                      <td>{detail.totalInstructorCharge}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Reports;