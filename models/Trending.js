const mongoose = require('mongoose')

const TrendingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: false,
    },
    desc: {
      type: String,
      required: false,
    },
    photo: {
      type: Object,
      required: false,
    },
    categories: {
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

module.exports = mongoose.model('Trending', TrendingSchema)
