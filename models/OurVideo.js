const mongoose = require('mongoose')

const OurVideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('OurVideo', OurVideoSchema)
