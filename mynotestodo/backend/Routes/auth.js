const express = require('express');
const router = express.Router();


router. get ('/', (req, res) => {
    obj = {
    a: 'thios',
    number: 34
    }

    res.json (obj)//returning the json object as response

    })
    
    
module.exports = router