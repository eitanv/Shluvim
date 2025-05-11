import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import '../styles.css';

function ManageInstitutes() {
  const [institutes, setInstitutes] = useState([]);
  const [rates, setRates] = useState([]);
  const [instituteTypes, setInstituteTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newInstitute, setNewInstitute] = useState({
    instituteName: '',
    rate: '',
    instituteType: '',
    rateCode: '',
  });
  const [selectedRate, setSelectedRate] = useState(null);

  const fetchInstitutes = useCallback(() => {
    if (rates.length > 0) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/institutes/`)
        .then((response) => response.json())
        .then((data) => {
          const institutesWithRates = data.map((institute) => {
            const rate = rates.find((rate) => rate.rateCode === institute.rateCode);
            return { ...institute, rate: rate ? rate.rate : '' };
          });
          setInstitutes(institutesWithRates);
        });
    }
  }, [rates]);

  useEffect(() => {

    fetch(`${process.env.REACT_APP_API_BASE_URL}/rates/`)
      .then((response) => response.json())
      .then((data) => {
        setRates(data);
        fetchInstitutes();
      })
      .catch((error) => console.error('Error fetching rates:', error));
  }, [fetchInstitutes]);

  const getRateByCode = (rateCode) => {
    const rate = rates.find((rate) => rate.rateCode === rateCode);
    return rate ? rate.rate : 'N/A';
  };

     fetch(`${process.env.REACT_APP_API_BASE_URL}/institute-types/`)
       .then((response) => response.json())
       .then((data) => setInstituteTypes(data))
       .catch((error) => console.error('Error fetching institute types:', error));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInstitute((prevState) => ({ ...prevState, [name]: value }));
    if (name === 'rateCode') {
      const rate = rates.find((rate) => rate.rateCode === value);
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInstitute),
    })
      .then((response) => {
        if (response.ok) {
          fetchInstitutes();
          handleClose();
        } else {
          throw new Error('Failed to add institute');
        }
      })
      .catch((error) => console.error('Error adding institute:', error));
  };

  const deleteInstitute = (id) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/institutes/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.ok) {
          fetchInstitutes();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch((error) => console.error('There was a problem with the fetch operation:', error));
  };

  return (
    <div className="centered-frame">
      <div className="frame-content">
        <div>
          <h2>ניהול מוסדות</h2>
          <Button variant="dark" onClick={handleShow}>
            הוספת מוסד
          </Button>
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
              {Array.isArray(institutes) &&
                institutes.map((institute) => (
                  <tr key={institute.instituteId}>
                    <td>{institute.instituteName}</td>
                    <td>{institute.instituteType}</td>
                    <td>{institute.rateCode}</td>
                    <td>{getRateByCode(institute.rateCode)}</td>
                    <td>
                      <Button variant="secondary" onClick={() => console.log('Update clicked')}>
                        עדכן
                      </Button>{' '}
                      <Button variant="danger" onClick={() => deleteInstitute(institute.instituteId)}>
                        מחק
                      </Button>{' '}
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
                as="select"
                name="instituteType"
                value={newInstitute.instituteType}
                onChange={handleChange}>
                <option value="">Select Institute Type</option>
                {instituteTypes.map((type) => (
                  <option key={type.id} value={type.type}>
                    {type.type}
                  </option>
                ))}
              </Form.Control>
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
                {rates.map((rate) => (
                  <option key={rate.rateCode} value={rate.rateCode}>
                    {rate.rateCode}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formRate">
              <Form.Label>Rate</Form.Label>
              <Form.Control type="text" name="rate" value={newInstitute.rate} readOnly />
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