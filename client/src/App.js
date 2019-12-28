import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';


class App extends Component {
  
  constructor() {
    super();
    this.state = {
      size: 0,
      socket: '',
      msg: [],
    };
  }

  componentDidMount() {
    const socket = socketIOClient('localhost:1000');
    this.setState({ socket });
    socket.on("size", data => this.setState({ size: data }));
    socket.on("id", data => this.setState({ id: data }));
    socket.on("msg", data => {
      var {msg} = this.state;
      msg = [...msg,data];
      this.setState({ msg });
    });

  }

  find = () => {
    const {socket } = this.state;
    socket.emit("find",socket.id);
  }

  stop = () => {
    const {socket } = this.state;
    socket.emit("stop",socket.id);
  }

  send = () => {
    const {socket } = this.state;
    socket.emit("send",document.getElementById("message_input").value);
    document.getElementById("message_input").value = "";
  }

  keyDown = (e) =>{
    if (e.key === 'Enter') {
        this.send();
    }
  }

  render(){
    var {size,socket,msg} = this.state;
    let msg_html = msg.map( i => <li class="list-group-item">{i}</li>);

    return (
      <div className="App">

    

      <div id="left_bar">

      </div>

      <div id="right_bar">

        <nav className="navbar navbar-light bg-light" id="top_nav">
          <a className="navbar-brand" href="#">
            {socket.id}
            <img src="/docs/4.4/assets/brand/bootstrap-solid.svg" width="30" height="30" alt=""/>
          </a>
        </nav>

        
          
          <div id="chat_content">

            <ul className="list-group list-group-flush">
              {msg_html}
            </ul>



          </div>


          

        
          <div className="input-group mb-3" id="message_form">

          <div className="input-group-prepend">
            <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={this.stop}>Exit</button>
            <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={this.find}>Find</button>
          </div>

          <input type='text' id="message_input" onKeyDown={this.keyDown} />
          
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.send}>Send</button>
          </div>


          </div>



      </div>

      
      

      </div>
    );

  }
}
  


export default App;
