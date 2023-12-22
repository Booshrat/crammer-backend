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
# Run on localhost
- `npm run start` in terminal and app runs on (http://127.0.0.1:3000)
- Once the backend is up and running visit the client repo which can be found here (https://github.com/Booshrat/crammer-frontend)
# Run on web service

To deploy the Crammer Educational App Back-End on Render, follow these steps:

1. **Create a Render Account:**
   - If you don't have a Render account, sign up at [Render](https://render.com/).

2. **Set up MongoDB Atlas:**
   - Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) if you don't have one.
   - Create a new cluster and obtain the connection string.

3. **Configure Environment Variables on Render:**
   - In your Render dashboard, navigate to your Crammer Back-End service.
   - Go to the **Environment** tab.
   - Add the following environment variables:
     ```env
     SECRET=89272C7FB8E681E84EA9B7AA7945A3DFD0D45ACA421FC485CE7B0D0912A5D838
     MONGODB_URI=<your MongoDB Atlas connection string>
     ```

4. **Deploy on Render:**
   - Connect your GitHub repository to Render for automatic deployments.
   - In the Render dashboard, click on **New Deployment**.
   - Select your GitHub repository and the branch you want to deploy.
   - Set the **Environment** to Node.js.
   - Click **Create Web Service**.

5. **Access your Deployed App:**
   - Once the deployment is successful, Render provides you with a URL. Access your Crammer Back-End by navigating to this URL.

Now, your Crammer Educational App Back-End is successfully deployed on Render. You can use the provided URL for your frontend application to interact with the backend services.

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
