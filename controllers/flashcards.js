const Flashcard = require('../model/flashcard')
const User = require('../model/user');
const jwt = require("jsonwebtoken")


const create = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const token = req.headers.authorization;

        const decoded = jwt.verify(token, process.env.SECRET);
        const username = decoded.username

        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const flashcard = await Flashcard.create({ question, answer, user: user._id });
        await User.findByIdAndUpdate(user._id, { $push: { flashcards: flashcard._id } }); //updating users flashcard array

        res.status(201).json(flashcard);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.SECRET);
        const username = decoded.username

        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const flashcards = await Flashcard.find({ user: user._id });

        res.status(200).json(flashcards);
    } catch (error) {
        console.log("Helloooo")
        res.status(400).json({ error: error.message });
    }
};

// const getOne = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const flashcard = await Flashcard.findOne({ _id: id, user: req.user._id });

//         if (!flashcard) {
//             return res.status(404).json({ error: 'Flashcard not found' });
//         }

//         res.status(200).json(flashcard);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };


const deleteFlashcard = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.SECRET);
        const username = decoded.username

        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const flashcard = await Flashcard.findOneAndDelete({ _id: id, user: user._id });

        if (!flashcard) {
            return res.status(404).json({ error: 'Flashcard not found' });
        }

        await User.findByIdAndUpdate(user._id, { $pull: { flashcards: id } });

        res.status(200).json({ message: 'Flashcard deleted' });
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message });
    }
};

// const update = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const flashcard = await Flashcard.findOneAndUpdate(
//             { _id: id, user: req.user._id }, 
//             req.body, 
//             { new: true }
//         );

//         if (!flashcard) {
//             return res.status(404).json({ error: 'Flashcard not found' });
//         }

//         res.status(200).json(flashcard);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

module.exports = {
    create,
    getAll,
    // getOne,
    // update,
    delete: deleteFlashcard
};
