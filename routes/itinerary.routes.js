const router = require("express").Router();
const mongoose = require('mongoose');
const Itinerary = require('../models/Itinerary.model');
const User = require('../models/User.model');

const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("./../middleware/jwt.middleware");


// GET /api/itineraries -  Retrieves all of the itineraries
router.get('/itineraries', (req, res) => {
    Itinerary.find( { isPublic : { $in: [ true ] } })
      .populate('activities')
      .then(allItneraries => res.json(allItneraries))
      .catch(err => res.json(err));
});

//  POST /api/itineraries -  Creates a new itinerary
router.post('/itineraries', isAuthenticated, (req, res) => {
  console.log(req.body)
  const { _id } = req.payload; 
  const { isPublic, title, duration,imageUrl, countries, cities, flightDetails, hotelDetails, activities, notes} = req.body;
  
  console.log("userID", _id)

  Itinerary.create({ isPublic, title, duration,imageUrl, countries, cities, flightDetails, hotelDetails, activities, notes, user : _id})
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

//  GET /api/itineraries/:id -  Retrieves a specific itinerary by id
router.get('/itineraries/:id', isAuthenticated, (req, res) => {
    const { _id } = req.payload; 
    const itineraryId = req.params.id;
    const  loggedInUserId = req.payload._id;
   
    if (!mongoose.Types.ObjectId.isValid(itineraryId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Itinerary.findById(itineraryId)
      .populate("user")
      
      .then(itinerary => {
        console.log(itinerary)
        // check if the itinerary and current logged user are same
        const isOwner = loggedInUserId  === itinerary.user._id.toString()
        // check if the itinerary and current logged user are not same but user is logged in
        // const isNotOwner = loggedInUserId  !== itinerary.user._id.toString() && req.payload.hasOwnProperty('name')
        
        if(!isOwner && itinerary.isPublic === false) {
          res.status(403).json({ message: 'Current itinerary is private.' })
          return;
        }
      
        res.status(200).json({itinerary, isOwner})

        console.log(itinerary)
      })
      .catch(error => res.json(error));
});

// PUT  /api/itineraries/:id -  Updates a specific itinerary by id
router.put('/itineraries/:id', isAuthenticated, (req, res) => {
    const itineraryId = req.params.id;
   
    if (!mongoose.Types.ObjectId.isValid(itineraryId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Itinerary.findByIdAndUpdate(itineraryId, req.body, { new: true })
      .then((updatedItinerary) => res.json(updatedItinerary))
      .catch(error => res.json(error));
});


// DELETE  /api/itineraries/:id  -  Deletes a specific itinerary by id
router.delete('/itineraries/:id', (req, res) => {
    const itineraryId = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(itineraryId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Itinerary.findByIdAndRemove(itineraryId)
      .then(() => res.json({ message: `Itinerary with ${itineraryId} is removed successfully.` }))
      .catch(error => res.json(error));
});

module.exports = router;
