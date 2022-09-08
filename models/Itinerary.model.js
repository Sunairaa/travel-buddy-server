const { Schema, model } = require("mongoose");

const itinerarySchema = new Schema({
  title: {type: String, required: true},
  location: {type: String, required: true},
  imageUrl: {type: String},

  flightDeparture: {type: Date},
  flightReturn: {type: Date},
  airline: {type: String},

  hotelCheckin: {type: Date},
  hotelCheckout: {type: Date},
  hotelName: {type: String},

  isPublic: {type: Boolean, default: false},
  activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }], 
  user: { type: Schema.Types.ObjectId, ref: "User" }
})

const Itinerary = model("Itinerary", itinerarySchema);

module.exports = Itinerary;