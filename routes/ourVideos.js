const router = require('express').Router()
const OurVideos = require('../models/OurVideo')

//CREATE Videos
router.post('/', async (req, res) => {
  const ourVideos = new OurVideos(req.body)
  try {
    const saveVideos = await ourVideos.save()
    res.status(200).json(saveVideos)
  } catch (err) {
    res.status(500).json(err)
  }
})

//UPDATE Video
router.put('/:id', async (req, res) => {
  try {
    const video = await OurVideos.findById(req.params.id)
    if (video.username === req.body.username) {
      try {
        const updateVideo = await OurVideos.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
        res.status(200).json(updateVideo)
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can update only your Videos!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//DELETE Video
router.delete('/:id', async (req, res) => {
  try {
    const video = await OurVideos.findById(req.params.id)
    if (video.username === req.body.username) {
      try {
        await video.delete()
        res.status(200).json('Your Videos has been deleted...')
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can delete only your Videos!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET POST
router.get('/:id', async (req, res) => {
  try {
    const videos = await OurVideos.findById(req.params.id)
    res.status(200).json(videos)
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET ALL POSTS
router.get('/', async (req, res) => {
  const username = req.query.user
  const catName = req.query.cat
  try {
    let videos
    if (username) {
      videos = await OurVideos.find({ username })
    } else if (catName) {
      videos = await OurVideos.find({
        categories: {
          $in: [catName],
        },
      })
    } else {
      videos = await OurVideos.find().sort({ _id: -1 })
    }
    res.status(200).json(videos)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
