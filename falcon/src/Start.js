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
  const [daId, setId] = useState(null);
  useEffect(() => {
    fetch('/getRandomText', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({id})})
      .then(response => {return response.json()}) 
      .then(data => {
        setText(data.content);
        setId(data.id);
      });
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
/*
  const fileSelectedHandler  = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }
*/
  const fileUploadHandler = (img) => {

  }
  const [uploadFile, setUploadFile] = useState();
  const submitForm = async (event) => {
    event.preventDefault();
    console.log(uploadFile)
    let file = {uploadFile: uploadFile};
    console.log(uploadFile);
    const res = await fetch('/getImage', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({text})});
    const done = await res.json();
    const reso = done.result;
    console.log(reso)
    let word1 = text;
    let word2 = reso;
    if (word1.length === 0 || word2.length === 0){
      return Number.MAX_VALUE;
    }
    let dp = [];
    for(let i = 0; i <= word1.length; i++){
        let curr = [];
        for(let j = 0; j <= word2.length; j++){
            curr.push(0);
        }
        dp.push(curr);
    }

    for(let i = 0; i <= word1.length; i++){
        for(let j = 0; j <= word2.length; j++){
            if(i === 0 || j === 0){
                dp[i][j] = Math.max(i, j);
            }
            else if(word1[i - 1] === word2[j - 1]){
                dp[i][j] = dp[i - 1][j - 1];
            }
            else{
                dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1;
            }
        }
    }

    let editDistance = dp[dp.length - 1][dp[0].length - 1];

    let score =  Math.floor(1/Math.sqrt(editDistance + 1) * 10000);
    console.log(score)
    let data = {id: daId, score}
    const res2 = await fetch('/updateScore', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)});
    const done2 = await res2.json();
    const reso2 = done2.daLeaderboard;
    console.log(reso2)
    alert(`Congratulations chunky charles. Your score was ${score} according to algorithm. The leaderboard is now ${reso2}`)
  };

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
          <form onSubmit = {submitForm}>
            <input type="file" name= "picture" onChange={(e) => 
            {e.target.files[0].arrayBuffer()
              .then(data => {setUploadFile(data)});
              }} />
            <input type="submit" />
          </form>
      </div>
    </div>
  )
}

export default Start;
