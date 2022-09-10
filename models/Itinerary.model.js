const { Schema, model } = require("mongoose");

const itinerarySchema = new Schema({
  isPublic: { type: Boolean, default: false },
  title: { type: String, required: true },
  duration: { type: String, required: true },
  imageUrl: { type: String },
  countries: { type: [String], required: true },
  cities: { type: [String], required: true },
  flightDetails: { type: [Object] },
  hotelDetails: { type: [Object] },
  activities: { type: [Object], required: true },
  notes: { type: [String] },
  user: { type: Schema.Types.ObjectId, ref: "User" }
})

const Itinerary = model("Itinerary", itinerarySchema);

module.exports = Itinerary;