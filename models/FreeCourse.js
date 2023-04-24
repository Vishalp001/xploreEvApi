const mongoose = require('mongoose')

const FreeCourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    enrollNo: {
      type: String,
      required: false,
    },
    coursePhoto: {
      type: String,
      required: false,
    },
    insImage: {
      type: String,
      required: false,
    },
    insName: {
      type: String,
      required: false,
    },
    insDesc: {
      type: String,
      required: false,
    },
    about: {
      type: String,
      required: false,
    },
    sylabus: {
      type: String,
      required: false,
    },
    courseLayout: {
      type: String,
      required: false,
    },
    instructions: {
      type: String,
      required: false,
    },
    courseLink: {
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

module.exports = mongoose.model('FreeCourse', FreeCourseSchema)
