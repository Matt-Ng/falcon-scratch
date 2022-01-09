async function getRandomText() {
    // generate random number 1-6
    const randoNum = Math.floor((Math.random()) * (6)) + 1;
    const response = await fetch('/api');
    let data = await response.json();
    let textData = data[randoNum.toString()];
    return textData;
}

function levDistance(word1, word2){
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

    return dp[dp.length - 1][dp[0].length - 1];
}

async function textAnalysis(imgFile){
    let data = {imgFile};
    const res = await fetch('/imgCompare', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)});
    const done = await res.json();
    return done.result;
}

async function leaderboardUpdate(id, score){
    let data = {id, score}
    const res = await fetch('/updateScore', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)});
}

async function main(){
    try{
        let data = await getRandomText();
        console.log(data.content)
        let scannedText = await textAnalysis("./public/wake.png");
        let editDistance = 3    //levDistance(scannedText, "Wake me up inside (save me) Call my name and save me from the dark (wake me up) Bid my blood to run (I can't wake up) Before I come undone (save me) Save me from the nothing I've become");
        let score = Math.floor(1/Math.sqrt(editDistance + 1) * 10000);
        console.log(score)
        await leaderboardUpdate(data.id, score);
    }
    catch(err){
        console.error(err);
    }
};

main();