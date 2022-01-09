import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import Nav from './Nav';
import Start from './Start';
import About from './About';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/expressBackend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <>
      <Router>
      <Nav />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/start" element={<Start/>} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </Router>
      </>
    );
  }
}

export default App;
