const mongoose = require('mongoose')

const EvPoliciesSchema = new mongoose.Schema(
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
    username: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('EvPolicies', EvPoliciesSchema)
