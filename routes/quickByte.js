const router = require('express').Router()
const QuickByte = require('../models/QuickByte')

//CREATE QuickByte
router.post('/', async (req, res) => {
  const newQuickByte = new QuickByte(req.body)
  try {
    const saveQuickByte = await newQuickByte.save()
    res.status(200).json(saveQuickByte)
  } catch (err) {
    res.status(500).json(err)
  }
})

//UPDATE QuickByte
router.put('/:id', async (req, res) => {
  try {
    const quickbyte = await QuickByte.findById(req.params.id)
    if (quickbyte.username === req.body.username) {
      try {
        const updatedquickbyte = await QuickByte.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
        res.status(200).json(updatedquickbyte)
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can update only your Quickbyte!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//DELETE POST
router.delete('/:id', async (req, res) => {
  try {
    const quickbyte = await QuickByte.findById(req.params.id)
    if (quickbyte.username === req.body.username) {
      try {
        await quickbyte.delete()
        res.status(200).json('QuickByte has been deleted...')
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can delete only your QuickByte!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET QuickByte
router.get('/:id', async (req, res) => {
  try {
    const quickbyte = await QuickByte.findById(req.params.id)
    res.status(200).json(quickbyte)
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET ALL QuickBytes
router.get('/', async (req, res) => {
  const username = req.query.user
  const catName = req.query.cat
  try {
    let quickbytes
    if (username) {
      quickbytes = await QuickByte.find({ username })
    } else if (catName) {
      quickbytes = await QuickByte.find({
        categories: {
          $in: [catName],
        },
      })
    } else {
      quickbytes = await QuickByte.find().sort({ _id: -1 })
    }
    res.status(200).json(quickbytes)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
