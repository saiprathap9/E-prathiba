import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ExamStart() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [data, setData] = useState();
  
  const examQstList = data?.data?.data?.exam;
  const navigate = useNavigate();
 
  const location = useLocation();
  const examId  = location.state.examId;
  const Id = location.state.id;
  const Token = location.state.token;
 
  console.log(Id);
  console.log(Token);
  console.log(examId);

//   id: dynamicId,
//   token: dynamicToken,
//   examId: examId,
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://test.e-prathibha.com/apis/start_exam?examId=${examId}`,
          {
            headers: {
              id: Id,
              server_key: '3w99V63pW7tJ7vavGXtCKo8cp',
              tokenu: Token,
            },
          }
        );
        console.log(response);
        setData(response);
        if (
          response.data &&
          response.data.data &&
          response.data.data.exams
        ) {
          setQuestions(response.data.data.exams);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [Id, Token]);

  function handleOptionChange(index, option) {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = option;
    setSelectedOptions(updatedOptions);
  }

  function handleNext() {
    const confirmed = window.confirm(
      'Are you sure you want to skip this question?'
    );
    if (!confirmed) {
      return;
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  }

  function handleFinish() {
    const data = {
      examId: examId,
      qno: 1,
    };

    axios
      .post('your_finish_exam_endpoint', data)
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  }

  const currentQuestion = questions[currentQuestionIndex];
  const optionKey = `option${currentQuestionIndex + 1}`;

  function handleFormSubmit() {
    navigate('/finish', {
      state: {
        id: Id,
        token: Token,
        examId: examId,
      },
    });
  }

  return (
    <div>
      <h2>Choose questions:</h2>
      <ul>
        {examQstList &&
          examQstList.map((choose, indx) => (
            <li key={indx}>
              {choose.Question && (
                <div>
                  <h3>Question {indx + 1}</h3>
                  <span>Question:</span>
                  <br />
                  <div
                    className="exam-div"
                    dangerouslySetInnerHTML={{
                      __html: choose.Question.question.above,
                    }}
                  ></div>
                </div>
              )}

              {choose.Exam && (
                <div>
                  <form action="/start">
                    <span>
                      <input
                        type="radio"
                        name={`option_${indx}`}
                        value={choose.Question.option1}
                        checked={selectedOptions[indx] === choose.Question.option1}
                        onChange={() => handleOptionChange(indx, choose.Question.option1)}
                      />
                      {choose.Question.option1}
                    </span>
                    <br />
                    <span>
                      <input
                        type="radio"
                        name={`option_${indx}`}
                        value={choose.Question.option2}
                        checked={selectedOptions[indx] === choose.Question.option2}
                        onChange={() => handleOptionChange(indx, choose.Question.option2)}
                      />
                      {choose.Question.option2}
                    </span>
                    <br />
                    <span>
                      <input
                        type="radio"
                        name={`option_${indx}`}
                        value={choose.Question.option3}
                        checked={selectedOptions[indx] === choose.Question.option3}
                        onChange={() => handleOptionChange(indx, choose.Question.option3)}
                      />
                      {choose.Question.option3}
                    </span>
                    <br />
                    <span>
                      <input
                        type="radio"
                        name={`option_${indx}`}
                        value={choose.Question.option4}
                        checked={selectedOptions[indx] === choose.Question.option4}
                        onChange={() => handleOptionChange(indx, choose.Question.option4)}
                      />
                      {choose.Question.option4}
                    </span>
                  </form>
                </div>
              )}
            </li>
          ))}
      </ul>
      <div>
        <button className="question" onClick={handleFormSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default ExamStart;
