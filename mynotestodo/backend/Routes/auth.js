const express = require('express');
const router = express.Router();
const User=require('../models/User.js');

//create a user using post 
router. post ('/', (req, res) => {
    
    console.log(req.body);
    const user=User(req.body);
    user.save();
    res.send(req.body);

    })
    
    
module.exports = router











// obj = {
//     a: 'thios',
//     number: 34
//     }

//     res.json (obj)//returning the json object as response
//     console.log(req.body);