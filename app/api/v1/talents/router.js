const express = require('express');
const router = express();

// import controller
const { create, index, find,update,destroy } = require('./controller');

router.get('/talents', index);
// router.get('/categories/:id', find);
// router.put('/categories/:id', update);   
// router.delete('/categories/:id', destroy);   
// router.post('/categories', create);s

module.exports = router;