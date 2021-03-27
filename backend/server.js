const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
})
const helmet = require('helmet');
const cors = require('cors');
const App = require('./src/App');
require('dotenv').config();

const port = process.env.SERVER_PORT
 
io.on('connection', (socket) => {
    
    socket.on('send', (data) => {

        io.emit('receive', (data))
    })

    socket.on('disconnect', () => {
        console.log('user desconnected: ' + socket.id);
    });
})


app.use(cors({origin: 'http://localhost:8080', credentials: true}));
app.use(helmet());
 
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use("/", App);

http.listen(port || 3520,() => {
    console.log("Server running on port" + port)
});

exports.io = io;