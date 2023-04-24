const router = require('express').Router()
const EvPolicies = require('../models/EvPolicies')

//CREATE EvPolicies
router.post('/', async (req, res) => {
  const newEvPolicies = new EvPolicies(req.body)
  try {
    const saveEvPolicies = await newEvPolicies.save()
    res.status(200).json(saveEvPolicies)
  } catch (err) {
    res.status(500).json(err)
  }
})

//UPDATE EvPolicies
router.put('/:id', async (req, res) => {
  try {
    const EvPoliciesUpdate = await EvPolicies.findById(req.params.id)
    if (EvPoliciesUpdate.username === req.body.username) {
      try {
        const updatedEvPolicies = await EvPolicies.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
        res.status(200).json(updatedEvPolicies)
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can update only your EvPolicies!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//DELETE POST
router.delete('/:id', async (req, res) => {
  try {
    const evPolicies = await EvPolicies.findById(req.params.id)
    if (evPolicies.username === req.body.username) {
      try {
        await evPolicies.delete()
        res.status(200).json('EvPolicies Post has been deleted...')
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can delete only your EvPolicies Post!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET EvPolicies
router.get('/:id', async (req, res) => {
  try {
    const evPolicies = await EvPolicies.findById(req.params.id)
    res.status(200).json(evPolicies)
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET ALL evPolicies
router.get('/', async (req, res) => {
  const username = req.query.user
  try {
    let evPolicies
    if (username) {
      evPolicies = await EvPolicies.find({ username }).sort({ _id: -1 })
    } else {
      evPolicies = await EvPolicies.find().sort({ _id: -1 })
    }
    res.status(200).json(evPolicies)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
