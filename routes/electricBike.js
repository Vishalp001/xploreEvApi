const router = require('express').Router()
const ElectricBike = require('../models/ElectricBike')

//CREATE ElectricBile
router.post('/', async (req, res) => {
  const newElectricBike = new ElectricBike(req.body)
  try {
    const savedElectricBike = await newElectricBike.save()
    res.status(200).json(savedElectricBike)
  } catch (err) {
    res.status(500).json(err)
  }
})

//UPDATE ElectricBile
router.put('/:id', async (req, res) => {
  try {
    const eBike = await ElectricBike.findById(req.params.id)
    if (eBike.username === req.body.username) {
      try {
        const updateeBike = await ElectricBike.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
        res.status(200).json(updateeBike)
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can update only your e-Bike!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//DELETE ElectricBile
router.delete('/:id', async (req, res) => {
  try {
    const electricBike = await ElectricBike.findById(req.params.id)
    if (electricBike.username === req.body.username) {
      try {
        await electricBike.delete()
        res.status(200).json('electricBike has been deleted...')
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can delete only your electricBike!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET ElectricCar
router.get('/:id', async (req, res) => {
  try {
    const electricBike = await ElectricBike.findById(req.params.id)
    res.status(200).json(electricBike)
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET ALL ElectricCar
router.get('/', async (req, res) => {
  const username = req.query.user
  const catName = req.query.cat
  try {
    let electricBike
    if (username) {
      electricBike = await ElectricBike.find({ username })
    } else if (catName) {
      electricBike = await ElectricBike.find({
        categories: {
          $in: [catName],
        },
      })
    } else {
      electricBike = await ElectricBike.find().sort({ _id: -1 })
    }
    res.status(200).json(electricBike)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
