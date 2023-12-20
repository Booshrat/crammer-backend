const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const flashcardRoutes = require('./routes/flashcardRoutes');
const quizRoutes = require('./routes/quizRoutes');
const cors = require('cors');
const axios = require('axios');
const { connectToMongoDB } = require('./db'); // Import the MongoDB connection function
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
connectToMongoDB(); // Call the MongoDB connection function

const Quiz = require('./model/quizModel');

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/user', userRoutes);
app.use('/flashcard', flashcardRoutes);
app.use('/quiz', quizRoutes);

app.get("/", (req, res) => {
  res.json({
    title: "Crammer App",
    description: "Take part in the quizzes and create your own flashcards"
  });
});

app.get("/api/questions/random", async (req, res) => {
  try {
    const randomQuestion = await Quiz.aggregate([{ $sample: { size: 1 } }]);
    res.json(randomQuestion[0]);
  } catch (error) {
    console.error('Error fetching random question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/fetch-and-store-trivia", async (req, res) => {
  try {
    const response = await axios.get('https://the-trivia-api.com/v2/questions/');
    const triviaQuestions = response.data; // Assuming response.data is an array of questions

    await Quiz.insertMany(triviaQuestions);

    // ...

    res.json({ success: true, message: 'Trivia questions fetched and stored successfully.' });
  } catch (error) {
    console.error('Error fetching and storing trivia questions:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB!');
    app.listen(port, () => {
      console.log(`Listening on port ${port}!`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });