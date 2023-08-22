const { findUser } = require('../db/db');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const User = require('../models/userModel'); // Adatta questo percorso
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

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
    console.log('req.body.email=>', req.body.email);
    
    findUser({ email: req.body.email })
        .then(user => {
            if (user) {
                console.log('user=>', user);
                return res.status(409).json({ message: 'Utente esistente fai il login' });
            }

            console.log('Mi registro');
            const newUser = new User(req.body); // Puoi assegnare direttamente la richiesta al modello

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    console.error('Error during hashing:', err);
                    return res.status(501).json({ message: 'Error: ' + err.message });
                }

                newUser._id = new mongoose.Types.ObjectId();
                newUser.password = hash;
                
                newUser.save() // Utilizzando direttamente il metodo .save() del modello
                    .then((user) => {
                        return res.status(201).json({
                            message: 'Registrazione avvenuta con successo',
                            user: user
                        });
                    })
                    .catch((err) => {
                        console.error('Error during user saving:', err);
                        return res.status(501).json({
                            error: {
                                message: err.message,
                                status: err.status,
                            },
                        });
                    });
            });
        })
        .catch(err => {
            // handle global error
            console.error('Global error:', err);
            res.status(500).json({ error: err.message });
        });
}
