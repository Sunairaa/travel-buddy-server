const { Schema, model } = require("mongoose");

const itinerarySchema = new Schema({
  isPublic: { type: Boolean, default: false },
  title: { type: String, required: true },
  duration: { type: String, required: true },
  imageUrl: { type: String, default: 'https://images.unsplash.com/photo-1499591934245-40b55745b905?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2372&q=80'},
  countries: { type: [String], required: true },
  cities: { type: [String], required: true },
  flightDetails: { type: [Object] },
  hotelDetails: { type: [Object] },
  activities: { type: [Object], required: true },
  notes: { type: [String] },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  contributor: { type: Schema.Types.ObjectId, ref: "User" }
})

const Itinerary = model("Itinerary", itinerarySchema);

module.exports = Itinerary;