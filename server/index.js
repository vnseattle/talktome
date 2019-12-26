// Imports libraries 
var express = require("express");
var app = express();

// Create Server 
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(1000);

//app.set("view engine","ejs");
//app.set("views","./views");




var Users = [];

io.on("connection", (socket) => {
    console.log("Someone is connected"+socket.id);
    Users.push(socket.id);
    socket.emit("yourID",[...Users]);

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
})



