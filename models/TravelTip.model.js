const { Schema, model } = require("mongoose");

const travelTipSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ["Transport", "Flight", "Hotel", "Other"],
    default: "Travel",
    required: true
   },
  user: { type: Schema.Types.ObjectId, ref: "User" }
})

const TravelTip = model("TravelTip", travelTipSchema);

module.exports = TravelTip;