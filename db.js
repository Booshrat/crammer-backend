const { MongoClient } = require('mongodb');

// Replace <password> with your actual MongoDB Atlas password
const uri = "mongodb+srv://snjclarke133:4J6jxKS8LGqCnors@reddy34.wxuooam.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
}

// Export the client for use in other parts of the application
module.exports = {
  connectToMongoDB,
  getMongoClient: () => client,
};