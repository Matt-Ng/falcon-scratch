import React, {useState, useEffect,Component} from 'react';
import './App.css';
import {getRemainingTime} from './timerlib';
import axios from 'axios';


const defaultTime =  {
    seconds : '00',
    minutes : '00'
}

function Start() {

    const [currentTime, setTime] = useState(defaultTime);
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState('');
    const [curState, setState] = useState(false);
    
    const cur = Date.parse(new Date());
    const countDownTimeMS = cur + 60000 * 5;
    let pause = true;
    var count = 60000 * 5;
  
    useEffect(()=> {
        const intervalId = setInterval(() => {
        if (!pause){
            updateTime(countDownTimeMS);
            count--;
        }
        }, 1000);
        return () => clearInterval(intervalId);
    },[])
  
    function updateTime(cd) {
      setTime(getRemainingTime(cd));
    }
    
    const fileSelectedHandler  = (event) => {
        console.log(event.target.files[0])
        setFile(event.target.files[0]);
        setFileName(event.target.file[0].name);
    }
  
    const fileUploadHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('File',file);
        try {
            const res = await axios.post('./upload', formData, {
                headers:{

                }
            });
        } catch (err){

        }
    }

    const onClick = () => {
        setState(true);
        pause = false;
    }

  return (
    <div>
        <div className="timer" style={curState ? {} : {display: "none"}}>
            <span>{currentTime.minutes}</span>
            <span>Minutes</span>
            <span>:</span>
            <span>{currentTime.seconds}</span>
            <span>Seconds</span>
        </div>
        <div className= "upload" style={curState ? {} : {display: "none"}}>
            <input type="file" onChange={fileSelectedHandler} />
            <button onClick={fileUploadHandler}>Submit</button>
        </div>
        <div>
            <button className="startBut" onClick={onClick} style={!curState ? {} : {display: "none"}}>Start</button>
        </div>
    </div>
  )
}

export default Start;
