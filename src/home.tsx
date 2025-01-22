import React, { useState } from 'react';
import {AsyncStorage} from 'react-native';

function Home() {
  const [csvData, setCsvData] = useState([]);

  // ฟังก์ชันที่ใช้สำหรับอัพโหลดไฟล์ .csv
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result;
        const rows = text.split('\n').map((row) => row.split(','));
        setCsvData(rows); // เก็บข้อมูลลงใน state
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a valid CSV file.');
    }
  };

  // ฟังก์ชันที่ใช้ในการเปิดข้อมูล
  const fnLIn = () => {
    console.log(csvData); // สามารถดูข้อมูลใน console
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
