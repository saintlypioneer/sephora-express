const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
require('dotenv').config();

const app = express();
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000;

// CHAT -- BEGIN
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});
// CHAT -- END

app.get('/', (req, res)=>{
    res.send("Hi")
})

const productRouter = require('./routes/product');
app.use('/api/v1/sephora', productRouter);

const userRouter = require('./routes/user');
app.use('/api/v1/user', userRouter);

// IO -- BEGIN
var messagesDS = [];
io.on('connection', (socket) => {
    console.log('a user connected');
    io.to(socket.id).emit('messages history', messagesDS);
    socket.on('chat message', (msg)=>{
        console.log(msg);
        messagesDS.push(msg);
        socket.broadcast.emit('chat message', msg);
    })
});
// IO -- END

mongoose.connect(process.env.MONGO_DB_URL, ()=>{
    console.log("connected...");
    server.listen(PORT, ()=>{
        console.log("Listening...")
    })
})