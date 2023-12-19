const express = require('express');
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const flashcardRoutes = require('./routes/flashcardRoutes')
const cors = require('cors');

const server = express()
const port = 3000
const URI = 'mongodb://localhost:27017'

server.use(cors());
server.use(express.json())

server.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

server.use('/user', userRoutes)
server.use('/flashcard', flashcardRoutes)


server.get("/", (req, res) => {
    res.json({
        title: "Crammer App",
        description: "Take part in the quizes and create your own flashcards"
    });
});

mongoose.connect(URI)
    .then(() => {
        server.listen(port, () => {
            console.log(`Connected to DB & Listening on port ${port}!`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

module.exports = server;
