import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [csvData, setCsvData] = useState([]);
  const [jsonData, setJsonData] = useState([]); // To store JSON data
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const text = e.target.result;
        processCsvData(text);
      };

      reader.readAsText(file);
    } else {
      alert('Please upload a valid CSV file.');
    }
  };

  const processCsvData = async (data) => {
    const rows = data.split('\n').map((row) => row.split(','));
    setCsvData(rows);

    // Convert CSV rows to JSON objects
    const headers = rows[0];
    const jsonObjects = rows.slice(1).map((row) => {
      const obj = {};
      row.forEach((cell, index) => {
        obj[headers[index]] = cell;
      });
      return obj;
    });

    setJsonData(jsonObjects);

    try {
      // Save the data to the API
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos/', jsonObjects);
      console.log('Data saved successfully:', response.data);
      alert('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data.');
    }
  };

  const fnLIn = () => {
    navigate('/ShowData', { state: { jsonData } }); // Navigate to ShowData with JSON data
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>CSV File Upload and Process</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {csvData.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Uploaded Data</h2>
          <table border="1" style={{ margin: '0 auto', textAlign: 'center' }}>
            <thead>
              <tr>
                {csvData[0].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        onClick={fnLIn}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Open Data
      </button>
    </div>
  );
}

export default Home;
