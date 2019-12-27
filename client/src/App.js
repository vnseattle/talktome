import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';


class App extends Component {
  
  constructor() {
    super();
    this.state = {
      size: 0,
      socket: '',
    };
  }

  componentDidMount() {
    const socket = socketIOClient('localhost:1000');
    this.setState({ socket });
    socket.on("size", data => this.setState({ size: data }));
    socket.on("id", data => this.setState({ id: data }));
  }

  find = () => {
    const {socket } = this.state;
    socket.emit("find",socket.id);
  }

  stop = () => {
    const {socket } = this.state;
    socket.emit("stop",socket.id);
  }

  render(){
    var {size,socket} = this.state;

    return (
      <div className="App">
        {size}
        <br/>
        {socket.id}
        <br/>
        <button onClick={this.find}>find</button>
        <br/>
        <button onClick={this.stop}>stop</button>
      </div>
    );

  }
}
  


export default App;
