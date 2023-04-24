const mongoose = require('mongoose')

const ChargingSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
    },
    city: {
      type: Array,
      required: true,
      location: {
        type: Array,
        required: true,
        link: {
          type: String,
          required: false,
        },
      },
    },

    username: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('ChargingStations', ChargingSchema)
