const router = require('express').Router()
const FreeCourse = require('../models/FreeCourse')

//CREATE FreeCourse
router.post('/', async (req, res) => {
  const newFreeCourse = new FreeCourse(req.body)
  try {
    const saveFreeCourse = await newFreeCourse.save()
    res.status(200).json(saveFreeCourse)
  } catch (err) {
    res.status(500).json(err)
  }
})

//UPDATE FreeCourse
router.put('/:id', async (req, res) => {
  try {
    const freeCourse = await FreeCourse.findById(req.params.id)
    if (freeCourse.username === req.body.username) {
      try {
        const updatedFreeCourse = await FreeCourse.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
        res.status(200).json(updatedFreeCourse)
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can update only your FreeCourse!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//DELETE FreeCourse
router.delete('/:id', async (req, res) => {
  try {
    const freeCourse = await FreeCourse.findById(req.params.id)
    if (freeCourse.username === req.body.username) {
      try {
        await freeCourse.delete()
        res.status(200).json('FreeCourse Post has been deleted...')
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can delete only your FreeCourse Post!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET FreeCourse
router.get('/:id', async (req, res) => {
  try {
    const freeCourse = await FreeCourse.findById(req.params.id)
    res.status(200).json(freeCourse)
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET ALL FreeCourse
router.get('/', async (req, res) => {
  const username = req.query.user
  const catName = req.query.cat
  try {
    let freeCourse
    if (username) {
      freeCourse = await Trending.find({ username })
    } else if (catName) {
      freeCourse = await Trending.find({
        categories: {
          $in: [catName],
        },
      })
    } else {
      freeCourse = await FreeCourse.find().sort({ _id: -1 })
    }
    res.status(200).json(freeCourse)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
