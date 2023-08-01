import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Finish() {
  const [loading, setLoading] = useState(); 
  const navigate = useNavigate();
  const location = useLocation();
  const Id = location.state.id;
  const Token = location.state.token;
  const examId = location.state.examId;
  console.log(Id);
  console.log(Token);
  console.log(examId);

  // id: Id,
  //       token: Token,
  //       examId: examId,

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://test.e-prathibha.com/apis/finishExam",
          {
            id: Id,
            tokenu: Token,
            examId:examId,
            qno:'1',
          },
          {
            headers: {
              id: Id,
              server_key: '3w99V63pW7tJ7vavGXtCKo8cp',
              tokenu: Token,
            },
          }
        );
        const data =  response.json();
        console.log(data);
       

        if (data.status === 200) {
          console.log(data.data);
          setLoading(data.data);
         
          // navigate('/result',store.data)
          
        } else {
          console.error('Failed exam data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    

    fetchData();
  }, [Token,Id,examId]);

  const resultPage = () => {
    navigate('/rusult', {
      state: {
        id: Id,
        tokenu: Token,
      }
    });
  };

  return (
    <div>
      <center>
        <h4>Exam Finish</h4>
      <div>
        <button onClick={resultPage}> ok</button>
      </div>
      </center>
    </div>
  );
}

export default Finish;







