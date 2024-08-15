const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser')
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
const Routerroute = require('./routes/routes')
 const server = http.createServer(app);
const io = socketIo(server);
require('./server/connection')

app.use(express.json());

 const session = require('express-session');

 app.use(session({
    secret: 'hello', // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));
// WebSocket logic
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('create-assignment', (data) => {
        io.to(data.classId).emit('new-assignment', data);
    });

    socket.on('submit-assignment', (data) => {
        io.to(data.teacherId).emit('assignment-submitted', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
app.use('/', Routerroute);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.get('/',(req,res)=>{
    res.render('student.ejs')
})
