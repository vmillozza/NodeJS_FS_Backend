const { default: mongoose } = require('mongoose');
const User = require("../models/userModel")
require('dotenv').config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.mongo);
        console.log('Connected to MongoDB');
    }
    catch (err) {
        console.error('Error connecting to MongoDB', err);
    }
}

const disconnect = async () => {
    try {
        await mongoose.connection.close();
    }
    catch (err) {
        console.error('Error to disconnecting to MongoDB', err);
    }
}
const findUser = async (obj) => {
    try {
        const user = await User.findOne(obj).exec();
        if (!user) {
            console.log("Nessun utente trovato con quell'indirizzo email.");
            return null;
        }
        console.log("Utente trovato:", user);
        return user;
    } catch (error) {
        console.error("Errore durante la ricerca dell'utente:", error);
        throw error;  // rilancia l'errore se desideri gestirlo al di fuori di questa funzione
    }
}

const saveUser = async (newuser) => {
    try {
        const savedUser = await newuser.save();
        return savedUser;
    } catch (error) {
        console.error("Error saving the user:", error);
        throw error;  // Rethrow the error so it can be caught and handled by the caller
    }
}
//{connect}: Questa è una sintassi di inizializzazione dell'oggetto ES6. È equivalente a scrivere {connect: connect}. Ciò significa che stai esportando un oggetto con una proprietà chiamata connect, il cui valore è la variabile/funzione connect definita nel modulo.
module.exports = { connect, disconnect, findUser, saveUser };