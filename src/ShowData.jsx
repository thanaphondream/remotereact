import React from 'react';
import { useLocation } from 'react-router-dom';

const ShowData = () => {
  const location = useLocation();
  const jsonData = location.state?.jsonData || []; // รับข้อมูล JSON จาก state

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Processed JSON Data</h1>
      {jsonData.length > 0 ? (
        <table border="1" style={{ margin: '0 auto', textAlign: 'center', width: '50%' }}>
          <thead>
            <tr>
              {Object.keys(jsonData[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jsonData.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(item).map((value, cellIndex) => (
                  <td key={cellIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data to display.</p>
      )}
    </div>
  );
};

export default ShowData;
