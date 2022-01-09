import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import {getRemainingTime} from './timerlib';
import {useLocation} from 'react-router-dom';

const defaultTime =  {
    seconds : '00',
    minutes : '00'
}

function Start() {
  
  const location = useLocation();
  var id = (location.state.id);
  const [text, setText] = useState(null);
  useEffect(() => {
    fetch('/getRandomText', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({id})})
      .then(response => {return response.json()})
      .then(data => {setText(data.content)});
  }, []);
  

  const [currentTime, setTime] = useState(defaultTime);

  const cur = Date.parse(new Date());
  const countDownTimeMS = new Date(cur + 60000);

  useEffect(()=> {
    const intervalId = setInterval(() => {
      updateTime(countDownTimeMS);
    }, 1000);
    return () => clearInterval(intervalId);
  },[])

  function updateTime(cd) {
    setTime(getRemainingTime(cd));
  }

  const fileSelectedHandler  = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  const fileUploadHandler = (img) => {

  }

  return (
    <div>
      <div className = "passage">
        { text &&
        <h2>{text}</h2>
        }
      </div>
        
      <div className="timer">
        <span>{currentTime.seconds}</span>
        <span>&nbsp;seconds</span>
      </div>
      <div className="App">
          <input type="file" name= "picture" onChange={fileSelectedHandler} />
          <button>Submit</button>
      </div>

    </div>
  )
}

export default Start;
