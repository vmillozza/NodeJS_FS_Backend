const { connect, disconnect, findUser, saveUser } = require('./db')

const User = require('../models/userModel');
const mongoose = require('mongoose');
const { describe } = require('node:test')

beforeAll(async () => {
    return await connect();
})
describe('User Test Suite', () => {
    test('I want save a user to database', async () => {
        try {
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),  // Genera un nuovo ObjectId
                firstName: 'Eric',
                lastName: 'Clack',
                address: '123 Main St',
                city: 'Orlando',
                state: 'FL',
                zipCode: '34256',
                password: 'ciao',
                email: 'eric1@gmail.com',
            });

            const user = await saveUser(newUser);
            console.log(user.firstName);
            expect(user.firstName).toEqual('Eric');
        } catch (error) {
            console.error("Error during test:", error);
            throw error; // Rilancia l'errore in modo che il test fallisca
        }
    });
});


afterAll(() => {
    // Eseguito dopo che tutti i test in questo blocco describe sono stati eseguiti.
    disconnect();
});
