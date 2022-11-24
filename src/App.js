import React, { useEffect, useState,useRef } from "react";
import "./App.css";
import { PieChart } from 'react-minimal-pie-chart';
function App() {
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const intervalRef=useRef(null)
  const[timer,setTimer]=useState('00:00:00')

  const json=[  
    {  
       "question":"What does HTML stand for?",
       "option":[  
          "Home Tool Markup Language",
          "Hyper Text Markup Language",
          "Hyperlinks and Text Markup Language"
       ],
       "answer":"Hyper Text Markup Language"
    },
    {  
       "question":"Who is making the Web standards?",
       "option":[  
          "Google",
          "Microsoft",
          "Mozilla",
      "The World Wide Web Consortium"
       ],
       "answer":"The World Wide Web Consortium"
    },
    {  
       "question":"Choose the correct HTML element for the largest heading:",
       "option":[  
          "<h6>",
          "<heading>",
          "<h1>",
      "<head>"
       ],
       "answer":"<h1>"
    },
    {  
       "question":"What is the correct HTML element for inserting a line break?",
       "option":[  
          "<br>",
          "<lb>",
          "<break>"
       ],
       "answer":"<br>"
    },
    {  
       "question":"What is the correct HTML for adding a background color?",
       "option":[  
          "<body bg='yellow'>",
          "<body style='background-color:yellow;'>",
          "<background>yellow</background>"
       ],
       "answer":"<body style='background-color:yellow;'>"
    },
    {  
       "question":"Choose the correct HTML element to define important text",
       "option":[  
          "<i>",
          "<strong>",
          "<b>",
      "<important>"
       ],
       "answer":"<b>"
    },
    {  
       "question":"Choose the correct HTML element to define emphasized text",
       "option":[  
          "<i>",
          "<italic>",
          "<em>"
       ],
       "answer":"<i>"
    },
    {  
       "question":"What is the correct HTML for creating a hyperlink?",
       "option":[  
          "<a href='http://www.w3schools.com'>W3Schools</a>",
          "<a>http://www.w3schools.com</a>",
          "<a url='http://www.w3schools.com'>W3Schools.com</a>",
      "<a name='http://www.w3schools.com'>W3Schools.com</a>"
       ],
       "answer":"<a href='http://www.w3schools.com'>W3Schools</a>"
    },
    {  
       "question":"Which character is used to indicate an end tag?",
       "option":[  
          "<",
          "*",
          "^",
      "/"
       ],
       "answer":"/"
    },
    {  
       "question":"How can you open a link in a new tab/browser window?",
       "option":[  
          "<a href='url' target='_blank'>",
          "<a href='url' target='new'>",
          "<a href='url' new>"
       ],
       "answer":"<a href='url' target='_blank'>"
    }
    
 ]
 
/*Timer Starts*/

 function getTimeRemaining(endtime){
  const total=Date.parse(endtime)-Date.parse(new Date());
  const seconds=Math.floor((total/1000) % 60)
  const minutes=Math.floor((total/1000/60) % 60)
  const hours=Math.floor((total/1000*60*60) % 24)
  const days=Math.floor((total/1000*60*60*24) % 24)
  return{
    total,days,hours,minutes,seconds
  }
 }

 function nextquestion(){
      setCurrentQuestion(currentQuestion+1)
}

 function startTimer(deadline){
  let {total,days,hours,minutes,seconds}=getTimeRemaining(deadline);
  if(total>=0){
    setTimer(
      (hours>58?hours:'0'+hours)+':'+(minutes>58?minutes:'0'+minutes)+':'+(seconds>58?seconds:'0'+seconds)
    )
  }else{
    clearInterval(intervalRef.current)
    nextquestion()
  }
 }

 function clearTimer(endtime){
  setTimer('00:00:10');
  if(intervalRef.current){
    clearInterval(intervalRef.current)
  }
  const id=setInterval(()=>{
    startTimer(endtime)
  },1000)
  intervalRef.current=id
 }

 function getDeadlineTime(){
  let deadline=new Date();
  deadline.setSeconds(deadline.getSeconds()+10)
  return deadline
 }

useEffect(()=>{
clearTimer(getDeadlineTime())

return ()=>{
  if(intervalRef.current)clearInterval(intervalRef.current)
  }
},[])

/*  Timer ends */

  const optionClicked = (isCorrect) => {
    let validoption=isCorrect==json[currentQuestion].answer
    if (validoption) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < json.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };




  return (
    <div className="App">
    <div className="title_alignment">
      <h2>Quiz Application</h2>
      <button className="timer_button">{timer}</button>
      </div>
      <hr/>
    <h3 className='sub_title'>Asp.Net Quiz</h3>
    <hr/>

      {showResults ? (
        <div className="result_container">
          <h1>Results</h1>
          <h2>
            {score} out of {json.length} correct - (
            {(score / json.length) * 100}%)
          </h2>
          <div className="piechart_container">
          <PieChart
  data={[
    { title: 'Success', value:score, color: 'green' },
    { title: 'Failure', value:json.length-score, color: 'red' },
  ]}
  label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
/>
</div>
        </div>
      ) : (

        <div>
          <span className="question_number">
            Question: {currentQuestion + 1} out of {json.length}
          </span>
          <div className="question_container">
          <h3 className="question_text">{`${currentQuestion + 1} . ${json[currentQuestion].question}`}</h3>
           
          <div className="option_container">
            {json[currentQuestion].option.map((option,index) => {
              return (
                <div className="option">
                <p
                  key={index}
                  onClick={() => optionClicked(option)}
                >
                  {option}
                </p>
                </div>
              );
            })}
          </div>
          </div>
        </div>
      )}
{/*PAGINATION */}
      {!showResults &&
      <div className="first_pagination">
      <ul className="pagination pagination-sm">
      <li className="page-link" onClick={()=>setCurrentQuestion(0)}>First</li>
     {currentQuestion==0?<button style={{color:"grey"}} className="page-link" disabled>Prev</button>:<li className="page-link" onClick={()=>setCurrentQuestion(currentQuestion-1)}>Prev</li>}
      <li className="page-link" onClick={()=>setCurrentQuestion(currentQuestion+1)}>Next</li>
      <li className="page-link" onClick={()=>setCurrentQuestion(9)}>Last</li>
      </ul>
      </div>
      }
      
      {!showResults &&
      <nav aria-label="..." className="pagination_container">
     
  <ul className="pagination pagination-sm">
    <li className="page-link" onClick={()=>setCurrentQuestion(0)}>1</li>
    <li className="page-link" onClick={()=>setCurrentQuestion(1)}>2</li>
    <li className="page-link" onClick={()=>setCurrentQuestion(2)}>3</li>
    <li className="page-link" onClick={()=>setCurrentQuestion(3)}>4</li>
    <li className="page-link" onClick={()=>setCurrentQuestion(4)}>5</li>
    <li className="page-link" onClick={()=>setCurrentQuestion(5)}>6</li>
    <li className="page-link" onClick={()=>setCurrentQuestion(6)}>7</li>
    <li className="page-link" onClick={()=>setCurrentQuestion(7)}>8</li>
    <li className="page-link" onClick={()=>setCurrentQuestion(8)}>9</li>
    <li className="page-link" onClick={()=>setCurrentQuestion(9)}>10</li>
  </ul>
</nav>  }
    </div>
  );
}

export default App;

