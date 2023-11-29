import React, { useState } from 'react';
import './styles.css';
import axios from 'axios';
import { useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../toast";
import { useParams } from 'react-router-dom';

export default function App() {

    const {eventId} =useParams()
    const [questions,setQuestions] =useState({})


    
    useEffect(() => {
        axios.get("http://localhost:5000/api/v1/question/"+eventId+"/"+localStorage.getItem("User_Id"),{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
        })
        .then((res) => {
            console.log(res.data.questions.Questions);
            setQuestions(res.data.questions.Questions);
            notify("Best of Luck","success");
        })
        .catch((err) => {
            console.log(err.response.data.msg);
            notify(err.response.data.msg,"error")

        })

      }, []);

   
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = async (isCorrect) => {
        let updatedScore=score;
		if (isCorrect) {
            updatedScore=updatedScore+1;
			 setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
            console.log(updatedScore);
            console.log(questions.length);
            const percentage = (updatedScore/questions.length)*100
            console.log(percentage);
            if(percentage>=50)
            {
                notify("You have passed the test","success")
            }
            else{
                notify("You have failed the test","error")
            }
            await axios.post("http://localhost:5000/api/v1/result",{
                object_id:localStorage.getItem("User_Id"),
                EventId:eventId,
                score:updatedScore
            },{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
            })
            .then((res) => {
                console.log(res);
                notify("Your result has been submitted","success")
            })
            .catch((err) => {
                console.log(err);
                notify(err.response.data.msg,"error")
            })
                

		}
	};
	return (
        <>
        <div className="container">
		 <div className='app '>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions?.length}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions?.length}
						</div>
						<div className='question-text'>{questions[currentQuestion]?.questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion]?.answerOptions?.map((answerOption) => (
							<button className='button' onClick={() => handleAnswerOptionClick(answerOption?.isCorrect)}>{answerOption?.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
        </div>
        <ToastContainer/> 
       
        </>
	);
}
