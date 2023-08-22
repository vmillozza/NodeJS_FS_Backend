const { findUser } = require('../db/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');

exports.loginUser = async (req, res) => {
    try {
        console.log('Entro nel try');
        console.log('req.body.email=>', req.body.email);

        const loggedUser = await findUser({ email: req.body.email }); // corretto il nome della funzione
        console.log('loggedUser=>', loggedUser);

        if (!loggedUser) {
            console.log('Autenticazione fallita utente inesistente');
            throw new Error('Autenticazione fallita utente inesistente');
        } else {
            const result = await bcrypt.compare(req.body.password, loggedUser.password); // aggiunto await

            if (result) {
                console.log('login successful');
                const token = jwt.sign({ user: loggedUser }, process.env.jwt_secret);
                return res.status(201).json({ // corretto res.status
                    user: loggedUser,
                    logged: true,
                    token: token,
                    message: 'login successful',
                });
            } else {
                console.log('Autenticazione fallita email o password ');
                throw new Error('Autenticazione fallita email o password ');
            }
        }
    } catch (e) {
        // Gestisci l'errore in qualche modo, es. inviando una risposta con stato 400 o 500
        return res.status(500).json({
            message: e.message,
            logged: false
        });
    }
}


exports.registerUser = (req, res) => {

}