const express = require('express');
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require('../models/Notes');


router. get ('/fetchallnotes',fetchuser, async (req, res) => {
    
    const notes= await Notes.find({user:req.user.id});
    res.json (notes)//returning the json object as response

    })
    
    
module.exports = router