const express = require('express');
const { saveUser, findUser } = require('../db/db');
const User = require("../models/userModel")
const router = express.Router();
const bcrypt = require('bcryptjs');
const { default: mongoose } = require('mongoose');

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
    let newUser;  // Dichiarato qui in modo che possa essere accessibile in tutti i blocchi .then()
    console.log('req.body=>',req.body);
    findUser({ email: req.body.email }).then(user=>{
        if(user){
            console.log('user=>',user);
            return res.status().json({message:'Utente esistente fai il login'})
        }
        else{
            console.log('Mi registro');
            const user = new User();
            const newUser = Object.assign(user,req.body); 

            bcrypt.hash(req.body.password,10,function(err,hash){
                if(err){
                    return res.status(501).json({message:'Error: ' + error.message});
                }
                else{
                    newUser._id = new mongoose.Types.ObjectId();
                    newUser.password = hash;
                    const dbUser = saveUser(newUser);
                    return res.status(201).json({message:'Registrazione avvenuta con successo: ' ,user});
                }

            });
        }
    })
    .catch((err)=>{
        error:{
            message:err.message; 

        }
    } )    
});


router.post('/login', (req, res, next) => {


});
module.exports = router;