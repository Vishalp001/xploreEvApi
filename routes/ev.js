const router = require('express').Router()
const EvSchema = require('../models/Ev')

//CREATE ElectricCar
router.post('/', async (req, res) => {
  const newElectricCar = new EvSchema(req.body)
  try {
    const savedElectricCar = await newElectricCar.save()
    res.status(200).json(savedElectricCar)
  } catch (err) {
    res.status(500).json(err)
  }
})

//UPDATE ElectricCar
router.put('/:id', async (req, res) => {
  try {
    const ecar = await EvSchema.findById(req.params.id)
    if (ecar.username === req.body.username) {
      try {
        const updateecar = await EvSchema.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
        res.status(200).json(updateecar)
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can update only your e-car!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//DELETE ElectricCar
router.delete('/:id', async (req, res) => {
  try {
    const electricCar = await EvSchema.findById(req.params.id)
    if (electricCar.username === req.body.username) {
      try {
        await electricCar.delete()
        res.status(200).json('electricCar has been deleted...')
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can delete only your electricCar!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET ElectricCar
router.get('/:id', async (req, res) => {
  try {
    const electricCar = await EvSchema.findById(req.params.id)
    res.status(200).json(electricCar)
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET ALL ElectricVehicles
// router.get('/', async (req, res) => {
//   const evtype = req.query.evtype
//   const upcoming = req.query.upcoming
//   try {
//     let ev
//     if (evtype) {
//       ev = await ElectricCar.find({ evtype })
//       res.status(200).json(ev)
//     } else if (upcoming) {
//       ev = await ElectricCar.find({ upcoming })
//       res.status(200).json(ev)
//     } else {
//       ev = await ElectricCar.find().sort({ _id: -1 })
//       res.status(200).json(ev)
//     }
//   } catch (err) {
//     res.status(500).json(err)
//   }
// })

router.get('/', async (req, res) => {
  try {
    ev = await EvSchema.aggregate([
      {
        $facet: {
          car: [
            {
              $match: {
                evtype: 'car',
                upcoming: 'no',
              },
            },
          ],
          bike: [
            {
              $match: {
                evtype: 'bike',
                upcoming: 'no',
              },
            },
          ],
          upcoming: [
            {
              $match: {
                upcoming: 'yes',
              },
            },
          ],
          upcomingBike: [
            {
              $match: {
                evtype: 'bike',
                upcoming: 'yes',
              },
            },
          ],
          upcomingCar: [
            {
              $match: {
                evtype: 'car',
                upcoming: 'yes',
              },
            },
          ],
        },
      },
    ])
    res.status(200).json(ev)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
