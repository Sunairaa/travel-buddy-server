const { Schema, model } = require("mongoose");

const tipSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" }
})

const Tip = model("Itinerary", tipSchema);

module.exports = Tip;