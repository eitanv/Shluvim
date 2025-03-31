import React, { useState, useEffect } from 'react';
import '../styles.css'; // Make sure to import the CSS file

function ManageInstitutes() {
  const [institutes, setInstitutes] = useState([]);

  useEffect(() => {
    // Fetch institutes from the backend
    fetch(`${process.env.REACT_APP_API_BASE_URL}/institutes/`)
      .then(response => response.json())
      .then(data => setInstitutes(data));
  }, []);

  const addInstitute = () => {
    // Logic to add institute
  };

  const deleteInstitute = (id) => {
    // Logic to delete institute
  };

  const updateInstitute = (id) => {
    // Logic to update institute
  };

  return (
  <div className="centered-frame">
  <div className="frame-content">
    <div>
      <h2>Manage Institutes</h2>
      <button onClick={addInstitute}>Add Institute</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {institutes.map(institute => (
            <tr key={institute.instituteId}>
              <td>{institute.instituteName}</td>
              <td>{institute.instituteType}</td>
              <td>{institute.rate}</td>
              <td>
                <button onClick={() => updateInstitute(institute.instituteId)}>Update</button>
                <button onClick={() => deleteInstitute(institute.instituteId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  </div>
  );
}

export default ManageInstitutes;