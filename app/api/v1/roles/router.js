const express = require('express');
const router = express();

// import controller
const { create, index, find, update, destroy } = require('./controller');

router.get('/role', index);
router.get('/role/:id', find);
router.put('/role/:id', update);   
router.delete('/role/:id', destroy);   
router.post('/role', create);


module.exports = router;