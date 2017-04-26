const express = require('express');
const router = express.Router();
const model = require('../google/model-datastore');

router.use((req, res, next) => {
    res.set('Content-Type', 'text/html');
    next();
});

router.get('/', function(req, res, next) {
    res.send('respond with bees buzzing');
});

router.get('/bees', function (req, res, next) {
    model.list(20, req.query.pageToken, (err, entities, cursor) => {
        if (err) {
            console.log(err);
            next(err);
            return;
        }
        console.log(entities.length + ' received from datastore');
        res.json(entities.reverse());
    });
});

module.exports = router;
