const express = require('express');
const { saveUser, findUser } = require('../db/db');
const User = require("../models/userModel")
const router = express.Router();
const bcrypt = require('bcryptjs');
const { default: mongoose } = require('mongoose');
const { loginUser } = require('../services/userServices');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Succefull - GET',
        metadata: {
            hostname: req.hostname,
            method: req.method,
        },
    });

});
router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Succefull - GET by Id',
        metadata: {
            id: req.params.id,
            hostname: req.hostname,
            method: req.method,
        },
    });

});
router.put('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Succefull - PUT by Id',
        metadata: {
            id: req.params.id,
            hostname: req.hostname,
            method: req.method,
        },
    });

});
router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Succefull - DELETE by Id',
        metadata: {
            id: req.params.id,
            hostname: req.hostname,
            method: req.method,
        },
    });

});
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Succefull - POST',
        metadata: {
            hostname: req.hostname,
            method: req.method,
        },
    });

});
router.post('/register', (req, res, next) => {
    findUser({ email: req.body.email })
        .then(user => {
            if (user) {
                console.log('user=>', user);
                return res.status(409).json({ message: 'Utente esistente fai il login' });
            }

            console.log('Mi registro');
            const userObj = new User();
            const newUser = Object.assign(userObj, req.body);

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(501).json({ message: 'Error: ' + err.message });
                }

                newUser._id = new mongoose.Types.ObjectId();
                newUser.password = hash;
                saveUser(newUser)
                    .then((user) => {
                        return res.status(201).json({
                            message: 'Registrazione avvenuta con successo: ',
                            user: user
                        });
                    })
                    .catch((err) => {
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
            console.error(err);
            res.status(500).json({ error: err.message });
        });
});



router.post('/login',loginUser);

module.exports = router;