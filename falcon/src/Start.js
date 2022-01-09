import React, {useState, useEffect} from 'react';
import './App.css';
import {getRemainingTime} from './timerlib';

const defaultTime =  {
    seconds : '00',
    minutes : '00'
}

function Start() {

    const [currentTime, setTime] = useState(defaultTime);

    const cur = Date.parse(new Date());
    const countDownTimeMS = new Date(cur + 60000 * 5);
  
    useEffect(()=> {
      const intervalId = setInterval(() => {
        updateTime(countDownTimeMS);
      }, 1000);
      return () => clearInterval(intervalId);
    },[countDownTimeMS])
  
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
    <div className="timer">
      <span>{currentTime.minutes}</span>
      <span>Minutes</span>
      <span>:</span>
      <span>{currentTime.seconds}</span>
      <span>Seconds</span>
    </div>
    <div className="App">
        <input type="file" name= "picture" onChange={fileSelectedHandler} />
        <button>Submit</button>
    </div>
    <div>
    <button>Start</button>
    </div>
    </div>
  )
}

export default Start;
