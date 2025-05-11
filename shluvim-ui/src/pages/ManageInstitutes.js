import React, { useState, useEffect , useCallback } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import '../styles.css';

function ManageInstitutes() {
  const [institutes, setInstitutes] = useState([]);
  const [rates, setRates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newInstitute, setNewInstitute] = useState({
    instituteName: '',
    rate: '',
    instituteType: '',
    rateCode: '' });

    const [selectedRate, setSelectedRate] = useState(null);

    useEffect(() => {
      // Fetch institutes
      fetch(`${process.env.REACT_APP_API_BASE_URL}/institutes/`)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            setInstitutes(data);
          } else {
            console.error('Expected an array but got:', data);
            setInstitutes([]);
          }
        })
        .catch(error => console.error('Error fetching institutes:', error));

      // Fetch rates
      fetch(`${process.env.REACT_APP_API_BASE_URL}/rates/`)
        .then(response => response.json())
        .then(data => setRates(data))
        .catch(error => console.error('Error fetching rates:', error));
    }, []);

    const getRateByCode = (rateCode) => {
      const rate = rates.find(rate => rate.rateCode === rateCode);
      return rate ? rate.rate : 'N/A'; // Return 'N/A' if no matching rate is found
    };

const handleChange = (e) => {
  const { name, value } = e.target;
  setNewInstitute((prevState) => ({ ...prevState, [name]: value }));

  if (name === 'rateCode') {
    const rate = rates.find((rate) => rate.rateCode === value); // Match rateCode
    setNewInstitute((prevState) => ({ ...prevState, rate: rate ? rate.rate : '' }));
  }
};

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setSelectedRate(null);
  };

  const addInstitute = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/institutes/addInstitute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newInstitute),
    })
      .then(response => {
        if (response.ok) {
          fetch(`${process.env.REACT_APP_API_BASE_URL}/institutes/`)
            .then(response => response.json())
            .then(data => setInstitutes(data));
          handleClose();
        } else {
          throw new Error('Failed to add institute');
        }
      })
      .catch(error => console.error('Error adding institute:', error));
  };

  return (
    <div className="centered-frame">
      <div className="frame-content">
        <div>
          <h2>ניהול מוסדות</h2>
          <Button variant="dark" onClick={handleShow}>הוספת מוסד</Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Rate Code</th>
                <th>Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(institutes) && institutes.map(institute => (
                <tr key={institute.instituteId}>
                  <td>{institute.instituteName}</td>
                  <td>{institute.instituteType}</td>
                  <td>{institute.rateCode}</td>
                  <td>{getRateByCode(institute.rateCode)}</td>
                  <td>
                    <Button variant="secondary" onClick={() => console.log('Update clicked')}>עדכן</Button>{' '}
                    <Button variant="danger" onClick={() => console.log('Delete clicked')}>מחק</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>הוספת מוסד</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formInstituteName">
              <Form.Label>שם מוסד</Form.Label>
              <Form.Control
                type="text"
                name="instituteName"
                value={newInstitute.instituteName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formInstituteType">
              <Form.Label>סוג מוסד</Form.Label>
              <Form.Control
                type="text"
                name="instituteType"
                value={newInstitute.instituteType}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formInstituteRateCode">
              <Form.Label>Rate Code</Form.Label>
              <Form.Control
                as="select"
                name="rateCode"
                value={newInstitute.instituteRateCode}
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
                value={newInstitute.rate}
                readOnly
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ביטול
          </Button>
          <Button variant="primary" onClick={addInstitute}>
            הוסף
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ManageInstitutes;