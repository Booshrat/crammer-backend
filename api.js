const express = require('express');
const cors = require('cors');

const api = express();

api.use(cors());
api.use(express.json());

api.get("/", (req, res) => {
    res.json({
        title: "Crammer App",
        description: "Take part in the quizes and create your own flashcards"
    });
});

module.exports = api;
