const express = require('express');
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const flashcardRoutes = require('./routes/flashcardRoutes')
const cors = require('cors');

const app = express()
const port = 3000
const URI = 'mongodb://localhost:27017'

app.use(cors());
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/user', userRoutes)
app.use('/flashcard', flashcardRoutes)


app.get("/", (req, res) => {
    res.json({
        title: "Crammer App",
        description: "Take part in the quizes and create your own flashcards"
    });
});

mongoose.connect(URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Connected to DB & Listening on port ${port}!`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

module.exports = server
