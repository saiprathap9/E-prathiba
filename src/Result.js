import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Result = () => {
  const [examId, setExamId] = useState('');
  const [qno, setQno] = useState('');
  const [response, setResponse] = useState('');

  const handleFinishExam = async () => {
    const apiUrl = 'https://api.example.com/finishExam'; 
              const serverKey = '3w99V63pW7tJ7vavGXtCKo8cp'; 
    const token = 'your_token'; 
    const body = {
      examId: examId,
      qno: qno
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-Api-Key': serverKey
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      setResponse(JSON.stringify(data));
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
     <center>
      <h2>Result</h2>
      <h4>Result:Fail</h4>
      <h4>Marks:0:00</h4>
      <h4>Percentage:0:00</h4>
      {/* <button>ok</button> */}
      <Link to="/" className="remove">
               <button>ok</button> 
              </Link>

    </center>
   
    </div>
  );
};

export default Result;
