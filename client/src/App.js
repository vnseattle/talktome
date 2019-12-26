import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';


class App extends Component {
  
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://localhost:1000/"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("yourID", data => this.setState({ response: data }));
  }

  render(){
    var {response} = this.state;

    return (
      <div className="App">
        {response}
      </div>
    );

  }
}
  


export default App;
