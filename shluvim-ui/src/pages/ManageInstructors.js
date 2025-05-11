import React, { useState, useEffect, useCallback } from 'react';
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
  const [editableInstructor, setEditableInstructor] = useState(null);

  const fetchInstructors = useCallback(() => {
    if (rates.length > 0) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/instructors/`)
        .then(response => response.json())
        .then(data => {
          const instructorsWithRates = data.map(instructor => {
            const rate = rates.find(rate => rate.rateCode === instructor.rateCode);
            return { ...instructor, rate: rate ? rate.rate : '' };
          });
          setInstructors(instructorsWithRates);
        });
    }
  }, [rates]);

  const fetchRates = useCallback(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/rates/`)
      .then(response => response.json())
      .then(data => setRates(data));
  }, []);

  const fetchInstitutes = useCallback(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/institutes/`)
      .then(response => response.json())
      .then(data => setInstitutes(data));
  }, []);

  useEffect(() => {
    fetchRates();
    fetchInstitutes();
  }, [fetchRates, fetchInstitutes]);

  useEffect(() => {
    fetchInstructors();
  }, [fetchInstructors]);

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

  const logNewReport = () => {
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
  };

  const deleteInstructor = (id) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/instructors/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          fetchInstructors();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  };

    const updateInstructor = (id) => {
      const instructorToUpdate = instructors.find(instructor => instructor.instructorId === id);
      fetch(`${process.env.REACT_APP_API_BASE_URL}/instructors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(instructorToUpdate),
      })
        .then(response => {
          if (response.ok) {
            fetchInstructors();
            setEditableInstructor(null);
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
    };

    const handleEditChange = (e, id) => {
      const { name, value } = e.target;
      setInstructors(prevState =>
        prevState.map(instructor =>
          instructor.instructorId === id
            ? {
                ...instructor,
                user: name === 'identityNumber' ? { ...instructor.user, identityNumber: value } : instructor.user,
                [name]: name !== 'identityNumber' ? value : instructor[name],
              }
            : instructor
        )
      );
    };

  return (
    <div className="centered-frame">
      <div className="frame-content">
        <div>
          <h2>Manage Instructors</h2>
          <Button variant="dark" onClick={handleShow}>Add Instructor</Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Rate Code</th>
                <th>Rate</th>
                <th>Identity No.</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map(instructor => (
                <tr key={instructor.instructorId}>
                  <td>
                    {editableInstructor === instructor.instructorId ? (
                      <Form.Control
                        type="text"
                        name="instructorName"
                        value={instructor.instructorName}
                        onChange={(e) => handleEditChange(e, instructor.instructorId)}
                      />
                    ) : (
                      instructor.instructorName
                    )}
                  </td>
                    <td>
                      {editableInstructor === instructor.instructorId ? (
                        <Form.Control
                          type="text"
                          name="identityNumber"
                          value={instructor.user.identityNumber}
                          onChange={(e) => handleEditChange(e, instructor.instructorId)}
                        />
                      ) : (
                        instructor.user.identityNumber
                      )}
                    </td>
                  <td>
                    {editableInstructor === instructor.instructorId ? (
                      <Form.Control
                        as="select"
                        name="rateCode"
                        value={instructor.rateCode}
                        onChange={(e) => handleEditChange(e, instructor.instructorId)}
                      >
                        <option value="">Select Rate Code</option>
                        {rates.map(rate => (
                          <option key={rate.rateCode} value={rate.rateCode}>
                            {rate.rateCode}
                          </option>
                        ))}
                      </Form.Control>
                    ) : (
                      instructor.rateCode
                    )}
                  </td>
                  <td>{instructor.rate}</td>
                  <td>
                    {editableInstructor === instructor.instructorId ? (
                      <Button variant="secondary" onMouseUp={() => updateInstructor(instructor.instructorId)}>Update</Button>
                    ) : (
                      <Button variant="secondary" onMouseDown={() => setEditableInstructor(instructor.instructorId)}>Update</Button>
                    )} {' '}
                    <Button variant="danger" onClick={() => deleteInstructor(instructor.instructorId)}>Delete</Button> {' '}
                    <Button variant="info" onClick={() => handleReportShow(instructor.instructorId)}>Log Hours</Button>
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