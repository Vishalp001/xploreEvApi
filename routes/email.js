const router = require('express').Router()
const Email = require('../models/Email')

//CREATE Blog
router.post('/', async (req, res) => {
  const newEmail = new Email(req.body)
  try {
    const saveEmail = await newEmail.save()
    res.status(200).json(saveEmail)
  } catch (err) {
    res.status(500).json(err)
  }
})

//DELETE POST
router.delete('/:id', async (req, res) => {
  try {
    const email = await Email.findById(req.params.id)
    try {
      await email.delete()
      res.status(200).json('Email has been deleted...')
    } catch (err) {
      res.status(500).json(err)
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET ALL Email
router.get('/', async (req, res) => {
  try {
    const email = await Email.find().sort({ _id: -1 })
    res.status(200).json(email)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
