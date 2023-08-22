const express = require('express');
const { saveUser, findUser } = require('../db/db');
const User = require("../models/userModel")
const router = express.Router();
const bcrypt = require('bcryptjs');
const { default: mongoose } = require('mongoose');
const { loginUser,registerUser } = require('../services/userServices');

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
router.post('/register', registerUser);



router.post('/login',loginUser);

module.exports = router;