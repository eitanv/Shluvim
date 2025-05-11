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
  const [editableInstitute, setEditableInstitute] = useState(null);


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
    .then((data) => setRates(data))
    .catch((error) => console.error('Error fetching rates:', error));
}, []); // Empty dependency array ensures this runs only once

useEffect(() => {
  if (rates.length > 0) {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/institutes/`)
      .then((response) => response.json())
      .then((data) => setInstitutes(data))
      .catch((error) => console.error('Error fetching institutes:', error));
  }
      fetch(`${process.env.REACT_APP_API_BASE_URL}/institute-types/`)
        .then((response) => response.json())
        .then((data) => setInstituteTypes(data))
        .catch((error) => console.error('Error fetching institute types:', error));

}, [rates]); // Runs only when `rates` changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInstitute((prevState) => ({ ...prevState, [name]: value }));
    if (name === 'rateCode') {
      const rate = rates.find((rate) => rate.rateCode === value);
      setNewInstitute((prevState) => ({ ...prevState, rate: rate ? rate.rate : '' }));
    }
  };

      const handleEditChange = (e, id) => {
        const { name, value } = e.target;
        setInstitutes((prevState) =>
          prevState.map((institute) => {
            if (institute.instituteId === id) {
              const updateInstitute = { ...institute, [name]: value };
              if (name === 'rateCode') {
                const selectedRate = rates.find((rate) => rate.rateCode === value);
                updateInstitute.rate = selectedRate ? selectedRate.rate : '';
              }
              return updateInstitute;
            }
            return institute;
          })
        );
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

  const updateInstitute = (id) => {
    const instituteToUpdate = institutes.find((institute) => institute.instituteId === id);
    fetch(`${process.env.REACT_APP_API_BASE_URL}/institutes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(instituteToUpdate),
    })
      .then((response) => {
        if (response.ok) {
          fetchInstitutes();
          setEditableInstitute(null);
        } else {
          throw new Error('Failed to update institute');
        }
      })
      .catch((error) => console.error('Error updating institute:', error));
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
            {institutes.map((institute) => (
              <tr key={institute.instituteId}>
                <td>
                  {editableInstitute === institute.instituteId ? (
                    <Form.Control
                      type="text"
                      name="instituteName"
                      value={editableInstitute === institute.instituteId ? institute.instituteName : ''}
                      onChange={(e) => handleEditChange(e, institute.instituteId)}
                    />
                  ) : (
                    institute.instituteName
                  )}
                </td>
                <td>
                  {editableInstitute === institute.instituteId ? (
                    <Form.Control
                      as="select"
                      name="instituteType"
                      value={institute.instituteType}
                      onChange={(e) => handleEditChange(e, institute.instituteId)}
                    >
                      <option value="">Select Institute Type</option>
                      {instituteTypes.map((type) => (
                        <option key={type.id} value={type.type}>
                          {type.type}
                        </option>
                      ))}
                    </Form.Control>
                  ) : (
                    institute.instituteType
                  )}
                </td>
                <td>
                  {editableInstitute === institute.instituteId ? (
                    <Form.Control
                      as="select"
                      name="rateCode"
                      value={institute.rateCode}
                      onChange={(e) => handleEditChange(e, institute.instituteId)}
                    >
                      <option value="">Select Rate Code</option>
                      {rates.map((rate) => (
                        <option key={rate.rateCode} value={rate.rateCode}>
                          {rate.rateCode}
                        </option>
                      ))}
                    </Form.Control>
                  ) : (
                    institute.rateCode
                  )}
                </td>
                <td>{institute.rate}</td>
                <td>
                  {editableInstitute === institute.instituteId ? (
                        <Button variant="secondary" onMouseUp={() => updateInstitute(institute.instituteId)}>שמור</Button>
                      )
                      : (
                        <Button variant="secondary" onMouseDown={() => setEditableInstitute(institute.instituteId)}>עדכן</Button>
                      )}
                   {' '}
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