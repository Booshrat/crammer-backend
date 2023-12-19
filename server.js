const express = require('express');
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const flashcardRoutes = require('./routes/flashcardRoutes')
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

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
        description: "Take part in the quizzes and create your own flashcards"
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

app.get("/fetch-and-store-trivia", async (req, res) => {
    try {
        // Use the 'SECRET' variable in your code
        const secret = process.env.SECRET;
        console.log('Secret:', secret);

        // Make a request to the Trivia API
        const response = await axios.get('https://the-trivia-api.com/v2/questions/');
        
        // Assuming the response data is an array of trivia questions
        const triviaQuestions = response.data;

        // Assuming you have a Quiz model defined using Mongoose
        const Quiz = require('./models/quizModel');

        // Store questions in the MongoDB collection
        await Quiz.insertMany(triviaQuestions);

        res.json({ success: true, message: 'Trivia questions fetched and stored successfully.' });
    } catch (error) {
        console.error('Error fetching and storing trivia questions:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});


module.exports = server;
