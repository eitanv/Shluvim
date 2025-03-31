import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import '../styles.css'; // Make sure to import the CSS file

function ManageInstructors() {
  const [instructors, setInstructors] = useState([]);
  const [rates, setRates] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newInstructor, setNewInstructor] = useState({ instructorName: '', rate: '', identityNumber: '', rateCode: '' });
  const [newReport, setNewReport] = useState({
    instructorId: '',
    instituteId: '',
    date: '',
    startTime: '',
    endTime: ''
  });
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    fetchInstructors();
    fetchRates();
    fetchInstitutes();
  }, []);

  const fetchInstructors = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/instructors/`)
      .then(response => response.json())
      .then(data => setInstructors(data));
  };

  const fetchRates = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/rates/`)
      .then(response => response.json())
      .then(data => setRates(data));
  };

  const fetchInstitutes = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/institutes/`)
      .then(response => response.json())
      .then(data => setInstitutes(data));
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleReportShow = (instructorId) => {
    setNewReport(prevState => ({ ...prevState, instructorId }));
    setShowReportModal(true);
  };
  const handleReportClose = () => setShowReportModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInstructor(prevState => ({ ...prevState, [name]: value }));

    if (name === 'rateCode') {
      const selectedRate = rates.find(rate => rate.rateCode === value);
      if (selectedRate) {
        setNewInstructor(prevState => ({ ...prevState, rate: selectedRate.rate }));
      }
    }
  };

  const handleReportChange = (e) => {
    const { name, value } = e.target;
    setNewReport(prevState => ({ ...prevState, [name]: value }));
  };

  const addInstructor = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/instructors/addInstructor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newInstructor),
    })
      .then(response => {
        if (response.ok) {
          fetchInstructors();
          handleClose();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  };

function logNewReport() {
  console.log('Sending report...');
  fetch(`${process.env.REACT_APP_API_BASE_URL}/instructors/report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newReport)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text(); // Read the response as text
    })
    .then(text => {
      if (text) {
        const data = JSON.parse(text); // Parse the text to JSON if not empty
        console.log('Report logged:', data);
      }
      handleReportClose(); // Close the modal after logging the report
    })
    .catch(error => {
      console.error('Error logging report:', error);
    });
}

  const deleteInstructor = (id) => {
    // Logic to delete instructor
  };

  const updateInstructor = (id) => {
    // Logic to update instructor
  };

  return (
    <div className="centered-frame">
      <div className="frame-content">
        <div>
          <h2>Manage Instructors</h2>
          <Button onClick={handleShow}>Add Instructor</Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map(instructor => (
                <tr key={instructor.instructorId}>
                  <td>{instructor.instructorId}</td>
                  <td>{instructor.instructorName}</td>
                  <td>{instructor.rate}</td>
                  <td>
                    <Button onClick={() => updateInstructor(instructor.id)}>Update</Button>
                    <Button onClick={() => deleteInstructor(instructor.id)}>Delete</Button>
                    <Button onClick={() => handleReportShow(instructor.instructorId)}>Log Hours</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Instructor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formInstructorName">
                  <Form.Label>Instructor Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="instructorName"
                    value={newInstructor.instructorName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formRateCode">
                  <Form.Label>Rate Code</Form.Label>
                  <Form.Control
                    as="select"
                    name="rateCode"
                    value={newInstructor.rateCode}
                    onChange={handleChange}
                  >
                    <option value="">Select Rate Code</option>
                    {rates.map(rate => (
                      <option key={rate.rateCode} value={rate.rateCode}>
                        {rate.rateCode}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formRate">
                  <Form.Label>Rate</Form.Label>
                  <Form.Control
                    type="text"
                    name="rate"
                    value={newInstructor.rate}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formIdentityNumber">
                  <Form.Label>Identity Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="identityNumber"
                    value={newInstructor.identityNumber}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={addInstructor}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showReportModal} onHide={handleReportClose}>
            <Modal.Header closeButton>
              <Modal.Title>Log New Report</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formInstructorId">
                  <Form.Label>Instructor ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="instructorId"
                    value={newReport.instructorId}
                    onChange={handleReportChange}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formInstituteId">
                  <Form.Label>Institute ID</Form.Label>
                  <Form.Control
                    as="select"
                    name="instituteId"
                    value={newReport.instituteId}
                    onChange={handleReportChange}
                  >
                    <option value="">Select Institute</option>
                    {institutes.map(institute => (
                      <option key={institute.instituteId} value={institute.instituteId}>
                        {institute.instituteName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formReportDate">
                  <Form.Label>Report Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={newReport.date}
                    onChange={handleReportChange}
                  />
                </Form.Group>
                <Form.Group controlId="formStartTime">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="startTime"
                    value={newReport.startTime}
                    onChange={handleReportChange}
                    step="1"
                  />
                </Form.Group>
                <Form.Group controlId="formEndTime">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="endTime"
                    value={newReport.endTime}
                    onChange={handleReportChange}
                    step="1"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleReportClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={logNewReport}>
                Log Hours
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ManageInstructors;