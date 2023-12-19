const { MongoClient } = require("mongodb");
// const User = require('../../../models/User')

describe('db test', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db(global.__MONGO_DB_NAME__);
    });

    afterAll(async () => {
        await connection.close();
    });


    it('should get all users', async () => {
        const user = db.collection('user')
        const mockUser = { _id: 'joe_id', username: 'joe', password: "joe" }
        const mockUserTwo = { _id: 'stephan_id', username: 'stephan', password: "stephan" }
        const mockreturn = [{ _id: 'joe_id', username: 'joe', password: "joe" },
        { _id: 'stephan_id', username: 'stephan', password: "stephan" }]
        await user.insertOne(mockUser);
        await user.insertOne(mockUserTwo);
        const insertedUser = await user.find().toArray();
        expect(insertedUser).toEqual(mockreturn);
    })

    it('should get one user by username', async () => {
        const user = db.collection('user')
        const mockUser = { _id: 'thomas_id', username: 'Thomas', password: "thomas" }
        const mockUserTwo = { _id: 'booshrat_id', username: 'Booshrat', password: "booshrat" }
        const mockreturn = [{ _id: 'thomas_id', username: 'Thomas', password: "thomas" }]
        await user.insertOne(mockUser);
        await user.insertOne(mockUserTwo);
        const insertedUser = await user.find({ username: 'Thomas' }).toArray();
        expect(insertedUser).toEqual(mockreturn);
    })


    it('should create a new user', async () => {
        const user = db.collection('user')
        const mockUser = { _id: 'new_user', username: 'New', password: "new" };
        await user.insertOne(mockUser);
        const insertedUser = await user.findOne({ username: 'New' });
        expect(insertedUser).toEqual(mockUser);
    })

})
