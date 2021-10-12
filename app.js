const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
// const Messages = require('./src/models/messagesModel')
const {Op} = require("sequelize")
const Users = require("./src/models/users.model")

// const usersRouter = require('./src/route/users.route');
const portfolioRouter = require('./src/route/portfolio.route')
const Messages = require('./src/models/messagesModel')

const usersRouter = require('./src/route/users.route');

const app  = express()
app.use(cors())
app.use(bodyparser.json())
app.use(portfolioRouter);
app.use(usersRouter);
app.use(portfolioRouter);
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
	    const data = JSON.stringify(getMessage)
        const message = JSON.parse(data)
        // console.log(message)
        io.to(sender).emit("history-messages", message);
    })
    socket.on("list-user", async(sender)=>{
        const getUser = await Messages.findAll({
            where:{
                [Op.or] : [{sender: sender}, {receiver: sender}]
            },
            group: ['sender','receiver'],
            include: [
                {model: Users, as: 'senderUsers'},
                {model: Users, as: 'receiverUsers'}
                    ]
        })
        const data = JSON.stringify(getUser)
        const contactUser = JSON.parse(data)
        io.to(sender).emit("contact-user", contactUser);
    })
})

const PORT = 2021
httpServer.listen(PORT, () => {
    console.log(`Service running on Port ${PORT}`);
});

module.exports = app;