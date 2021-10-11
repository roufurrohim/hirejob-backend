const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
// const Messages = require('./src/models/messagesModel')
const {Op} = require("sequelize")

// const usersRouter = require('./src/route/users.route');
const portfolioRouter = require('./src/route/portfolio.route')
const Messages = require('./src/models/messagesModel')
const {Op} = require("sequelize")

const usersRouter = require('./src/route/users.route');

const app  = express()
app.use(cors())
app.use(bodyparser.json())
app.use(portfolioRouter);
app.use(usersRouter);
app.use("/uploads", express.static(__dirname + "/image/uploads"))
app.use("/helpers", express.static(__dirname + "/image/helpers"))


const httpServer = http.createServer(app)



const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket)=>{
    console.log("a User Connected")
    socket.on("login", (room)=>{
        console.log("a User joined room" + room)
        socket.join(room)
    })
    socket.on("send-message", async(payload)=>{
        const {sender, receiver, msg} = payload
        const sendMessage = await Messages.create({
            sender : sender,
            receiver : receiver,
            msg : msg
        })
        io.to(receiver).emit("list-message", payload);
    })
    socket.on("get-message",async(payload)=>{
        const {sender, receiver} = payload
        const getMessage = await Messages.findAll({
            where: {
                [Op.or] : [{
                    sender : sender,
                    receiver: receiver
                },{
                    sender: receiver,
                    receiver: sender
                }]
            },
        })
        io.to(sender).emit("history-messages", getMessage);
    })
})

const PORT = 2021
httpServer.listen(PORT, () => {
    console.log(`Service running on Port ${PORT}`);
});

module.exports = app;