## Crammer Educational App Back-End

Welcome, this is the Back-End Repository for the Crammer App and has been made by Booshrat, Abid, Thomas, Stephan and Joe

# Features of the app

```
- Create your own flashcards for revision material
- Takes part in an infinitely looping quiz and see how high you can score
- Compete to have your score be the highest in the leaderboard page
```

# Installation and Usage

- Open Git Bash
- `git clone git@github.com:Booshrat/crammer-backend.git` & cd into crammer-backend
- Open in your respective code editor
- `npm i` in terminal
- Create a .env file
- Copy and paste this into the .env 
```
SECRET = 89272C7FB8E681E84EA9B7AA7945A3DFD0D45ACA421FC485CE7B0D0912A5D838
MONGODB_URI='mongodb://127.0.0.1:27017'
```
- `npm run start` in terminal and app runs on (http://127.0.0.1:3000)

# Technologies Used

- Express
- Node.js
- Jest
- MongoDB
- React
- Render
- Bcrypt
- Cors
- Jwt
- GitHub
- Nodemon
- Mongoose
- Axios

# Process

- Started by implementing a basic react back end for the repo
- created a model called user and built a database around that
- then added in the flashcard and quiz models and linked them to the user model
- this allowed me to make the features of the app only available to people who have registered and logged in
- Whilst adding additional functionality to the app we started testing everything we could and have achieved 80% coverage

# Wins and Challenges

- An early win was the login and register function, seemlessly implemented it and it never let us down
- Another win was the flashcards functionality, it was implemented in the first day and worked perfectly ever since
- A big challenge was the quiz app, hundreds of lines of code and blood sweat and tears was poured into getting it ready for the finished app
