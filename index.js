const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.static('public'));
app.use(express.json());
const port = process.env.PORT || 9000;

const { mongoUsername, mongoPassword } = require('./config'); 
const aws = require('aws-sdk');
const fs = require('fs/promises');

const { TextractClient, AnalyzeDocumentCommand } = require("@aws-sdk/client-textract");
const { accessKeyID, secretAccessKey, region } = require("./config.js");

aws.config.update({
    accessKeyID,
    secretAccessKey,
    region
});

const textract = new aws.Textract();

app.use(express.static(__dirname + '/public'));

mongoose.connect(`mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.08j7s.mongodb.net/Cluster0?retryWrites=true&w=majority`, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const connection = mongoose.connection;
const namesList = [];

connection.on('open', function(){
	console.log("connected to mongo");
	console.log(connection.readyState)
});

const Schema = mongoose.Schema;

const textSchema = new Schema({
	title: String,
	language: String,
	id: String,
	content: String,
	leaderboard: String,
});

const text = mongoose.model('Text', textSchema, 'Text');

app.listen(port, () => {
	console.log(`App listening on port ${port}!`);
});	

app.get('/expressBackend', (req, res) => {
	res.send({express: "Express is now connected to React"});
});

app.post('/getRandomText', async (req, res) => {
	let textData;
	try {
		let id = req.body.id;
		if(id === '-1'){
			console.log("rando")
			id = (Math.floor((Math.random()) * (6))).toString();
			console.log("id " +id)
		}
		const data = await text.find({}).exec();
		console.log(data)
		textData = data[id];
		console.log(textData);
	}
	catch(err){
		console.log("error: " + err);
	}
	console.log("result id: " + textData.id)
	
    res.json(textData);
})

app.post('/getImage', async (req, res) => {
	let str = ""
	try{/*
		const img = req.body;
		console.log(img)*/
		console.log(req.body.text)
		const text = req.body.text;
		let filename = "";
		if(text.includes("Schau")){
			filename = "./german.jpeg";
		}
		else if(text.includes("You might think you've peeped the scene")){
			filename = "./cinderella.png";
		}
		else if(text.includes("Giovanni Giorgio")){
			filename = "./giorgio.jpeg"
		}
		else{
			filename = "./aurora.png"
		}
		const imgBuffer = await fs.readFile(filename);
		const res = await textract.detectDocumentText({Document: {Bytes: imgBuffer}}).promise();
		let blocks = res.Blocks;
		for(const block of blocks){
			if (block.BlockType === 'LINE'){
				str += block.Text + " ";
			}
		}
	}
	catch(err){
		console.log("error: " + err);
	}
	res.send({result: str});
})

app.get('/', async (req, res) => {
	res.sendFile(`${__dirname}/public/start.html`);
});

app.get('/api', async (req, res) => {
	try {
		const data = await text.find({}).exec();
		res.json(data);
	}
	catch(err) {
		console.log("error: " + err);
	} 
});

app.post('/imgCompare', async (req, res) => {
	let str = "";
	try {
		console.log("req body: " + req.body.imgFile)
		const imgBuffer = await fs.readFile(req.body.imgFile);
		const res = await textract.detectDocumentText({Document: {Bytes: imgBuffer}}).promise();
		let blocks = res.Blocks;
		for(const block of blocks){
			if (block.BlockType === 'LINE'){
				str += block.Text + " ";
			}
		}
		console.log(str);
		
		//let str = "Off the grid grid grid"
	}
	catch(err) {
		console.log("error: " + err);
	}
	res.send({result: str});
});

app.post('/updateScore', async (req, res) => {
	let daLeaderboard;
	try {
		let id = req.body.id;
		let score = req.body.score;
		console.log(id + " " + score + "%%%%");
		const data = await text.find({ });
		//console.log(data)
		let currtext;
		for(const curr in data){
			//console.log(data[curr])
			console.log(data[curr].id + " " + id);
			if(data[curr].id == id){
				currtext = data[curr];
				break;
			}
		}
		console.log(currtext)
		let leaderboard = JSON.parse(currtext.leaderboard).board;
		console.log(leaderboard)
		leaderboard.push([score, "chunky charles"]);
		leaderboard = leaderboard.sort();
		if(leaderboard.length > 10){
			leaderboard.pop();
		}
		daLeaderboard = leaderboard
		
		let newObj = {board: leaderboard};
		text.updateOne({id}, {$set: {leaderboard: JSON.stringify(newObj)}}, (err) => {
			if(err){
				console.log("leaderboard update failed");
			}
		});
	}
	catch(err) {
		console.log("error: " + err);
	}
	res.send({daLeaderboard});
});