const router = require('express').Router()
const News = require('../models/News')

//CREATE Blog
router.post('/', async (req, res) => {
  const newNews = new News(req.body)
  try {
    const savedNews = await newNews.save()
    res.status(200).json(savedNews)
  } catch (err) {
    res.status(500).json(err)
  }
})

//UPDATE News
router.put('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
    if (news.username === req.body.username) {
      try {
        const updateNews = await News.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
        res.status(200).json(updateNews)
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can update only your News!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//DELETE News
router.delete('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
    if (news.username === req.body.username) {
      try {
        await news.delete()
        res.status(200).json('News has been deleted...')
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can delete only your News!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET POST
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
    res.status(200).json(news)
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET ALL POSTS
router.get('/', async (req, res) => {
  const username = req.query.user
  const catName = req.query.cat
  try {
    let newes
    if (username) {
      newes = await News.find({ username })
    } else if (catName) {
      newes = await News.find({
        categories: {
          $in: [catName],
        },
      })
    } else {
      newes = await News.find().sort({ _id: -1 })
    }
    res.status(200).json(newes)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
