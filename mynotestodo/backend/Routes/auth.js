const express = require('express');
const router = express.Router();
const User=require('../models/User.js');
const { body, validationResult } = require('express-validator');

//create a user using post 
router. post ('/',[

body('name').isLength({min:3}),
body('email').isEmail(),
body('password').isLength({min:5}),

] , async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newUser = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        });
        res.json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
    
    
module.exports = router






// const result = validationResult(req);
// if (result.isEmpty()) {
//     return res.status(400).json({errors:errors.array()});
//   }
//   User.create({
//     name: req.body.name,
//     password: req.body.password,
//     email: req.body.email
// }).then(user => res.json(user));




// obj = {
//     a: 'thios',
//     number: 34
//     }

//     res.json (obj)//returning the json object as response
//     console.log(req.body);