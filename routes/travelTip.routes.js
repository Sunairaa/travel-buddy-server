const router = require("express").Router();
const mongoose = require('mongoose');
const User = require('../models/User.model');
const TravelTip = require('../models/TravelTip.model');

const jwt = require("jsonwebtoken");
const { isAuthenticated, isOwner } = require("../middleware/jwt.middleware");


// GET /api/tips -  Retrieves all of the tips
router.get('/traveltips', (req, res) => {
    console.log(req.payload)
    TravelTip.find()
    .populate('owner')
      .then(response => res.json(response))
      .catch(err => res.json(err));
});

//  POST /api/tips -  Creates a new tip
router.post('/traveltips', isAuthenticated, (req, res) => {
    const { title, description } = req.body;
  
    TravelTip.create({ title, description, owner: _id})
    .then(response => res.json(response))
    .catch(err => res.json(err));
});


// DELETE  /api/tips/:id  -  Deletes a specific tip by id
router.delete('/traveltips/:id', isAuthenticated, isOwner, (req, res) => {
    const tipID = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(tipID)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

    TravelTip.findByIdAndRemove(tipID)
    .then(() => res.json({ message: `Tip with ${tipID} is removed successfully.` }))
    .catch(error => res.json(error));
});

module.exports = router;
