const { TestWatcher } = require('jest');
const mongoose = require('mongoose');
const User = require("../models/userModel");

beforeAll(async () => {
    const url = 'mongodb+srv://mern:Password@merndemo.i6veu.mongodb.net/MERNDemo?retryWrites=true&w=majority'
    await mongoose.connect(url, { useNewUrlParser: true })
})

it('Should get a user from db', async done => {
    expect(mongoose.connection.readyState).toBe(1)
    const user = await User.findOne({username: "chi"}, {collection: 'users'})
    expect(user).toBeTruthy()
    done()
})

afterAll(done => {
    mongoose.connection.close();
    done()
})

