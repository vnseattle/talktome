/*******************************************************
 * Author: Henry Ng
 * Setup the server
 * Using express, socket.io
 ******************************************************/
const Clients = require('./clients.js')
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(1000);

/*******************************************************
 * Clients management
 ******************************************************/
let clients = new Clients;

/*******************************************************
 * Start listening
 ******************************************************/
io.on("connection", onConnect);


/*******************************************************
 * A client connects to the server 
 * @param {socket} socket 
 ******************************************************/
function onConnect(socket){

    console.log("Someone is connected"+socket.id);
     // Catch disconnect event 
     socket.on("disconnect", onDisconnect);

     // Add client to client list 
     clients.add(socket.id);

     // Notify to all clients
     io.sockets.emit("yourID",clients.getSize());

}

/*******************************************************
 * A client disconnects to the server 
 * @param {socket} socket 
 ******************************************************/
function onDisconnect(socket){
    console.log("Someone disconnect")

     // Remove the client to client list 
     clients.remove(socket.id);

     // Notify to all clients
     io.sockets.emit("yourID",clients.getSize());
}
















/**
 * 
 *  Users.push(socket.id);
    io.sockets.emit("yourID",Users);

    socket.on("client-send-username", (data) => {
        if(Users.indexOf(data)>=0){
            socket.emit("register-fail");
        }else{
            socket.Username = data;
            Users.push(data);
            socket.emit("register-ok",data);
            io.sockets.emit("send-all-users", Users);
        }
    });
 */



