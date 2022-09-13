const router = require("express").Router();
const mongoose = require('mongoose');
const Itinerary = require('../models/Itinerary.model');
const User = require('../models/User.model');

const jwt = require("jsonwebtoken");
const { isAuthenticated, isOwner } = require("./../middleware/jwt.middleware");

// ********* require fileUploader  *********
const fileUploader = require("../config/cloudinary.config");

// GET /api/profile -  Retrieves the user
router.get('/profile', isAuthenticated, (req, res) => {
    const { _id } = req.payload; 
    User.findById(_id)
      .then(user => res.json(user))
      .catch(err => res.json(err));
});

// PUT /api/profile -  Updates the user
router.put('/profile', isAuthenticated, (req, res) => {
  const { _id } = req.payload; 
  const {imageUrl} = req.body
  User.findByIdAndUpdate(_id, {imageUrl}, {new: true})
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

// GET /api/my-itineraries -  Retrieves all of my itineraries
router.get('/my-itineraries', isAuthenticated, (req, res) => {
  const { _id } = req.payload; 

  Itinerary.find( { user: _id })
  .populate('user')
    .then(allItneraries => res.json(allItneraries))
    .catch(err => res.json(err));
});

// GET /api/itineraries -  Retrieves all of the itineraries
router.get('/itineraries', (req, res) => {

    Itinerary.find( { isPublic : { $in: [ true ] } })
    .populate('user')
      .then(allItneraries => res.json(allItneraries))
      .catch(err => res.json(err));
});

//  POST /api/itineraries -  Creates a new itinerary
router.post('/itineraries', isAuthenticated, (req, res) => {
  const { _id } = req.payload; 
  const { isPublic, title, duration,imageUrl, countries, cities, flightDetails, hotelDetails, activities, notes} = req.body;
  
  Itinerary.create({ isPublic, title, duration,imageUrl, countries, cities, flightDetails, hotelDetails, activities, notes, user: _id})
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

//  GET /api/itineraries/:id -  Retrieves a specific itinerary by id
router.get('/itineraries/:id', isAuthenticated, (req, res) => {
    const { _id } = req.payload; 
    const itineraryId = req.params.id;
    const loggedInUserId = req.payload._id;
   
    if (!mongoose.Types.ObjectId.isValid(itineraryId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Itinerary.findById(itineraryId)
      .populate("user")
      .then(itinerary => {
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
router.put('/itineraries/:id', fileUploader.single("image"), isAuthenticated, (req, res) => {
    const itineraryId = req.params.id;
    const  loggedInUserId = req.payload._id;
    const { isPublic, title, duration, imageUrl, countries, cities, flightDetails, hotelDetails, activities, notes, user} = req.body;

    // check if new image uploaded
    let newImage = req.file ? req.file.path : imageUrl;
    
    if (!mongoose.Types.ObjectId.isValid(itineraryId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Itinerary.findById(itineraryId)
      .populate("user")
      .then((itineraryToUpdate) => {
        // check if the itinerary and current logged user are same
        const isOwner = loggedInUserId  === itineraryToUpdate.user._id.toString()

        if(!isOwner) {
          res.status(403).json({ message: 'Current user is not owner of this itinerary.' })
          return;
        }

        Itinerary.findByIdAndUpdate(itineraryId, { isPublic, title, duration, imageUrl: newImage, countries, cities, flightDetails, hotelDetails, activities, notes, user}, {new: true})
        .then((updatedItinerary) => res.json(updatedItinerary))
        .catch(error => res.json(error));
      
      })
    
      
});


// DELETE  /api/itineraries/:id  -  Deletes a specific itinerary by id
router.delete('/itineraries/:id', isAuthenticated, isOwner, (req, res) => {
    const itineraryId = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(itineraryId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Itinerary.findByIdAndRemove(itineraryId)
      .then(() => res.json({ message: `Itinerary with ${itineraryId} is removed successfully.` }))
      .catch(error => res.json(error));
});


// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("image"), (req, res, next) => {
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
});

module.exports = router;
