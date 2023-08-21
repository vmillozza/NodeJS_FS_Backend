const express = require('express');
const router = express.Router();

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
module.exports = router;