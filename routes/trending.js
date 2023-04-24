const router = require('express').Router()
const Trending = require('../models/Trending')
const News = require('../models/News')
const Blog = require('../models/Blog')
const Policies = require('../models/EvPolicies')

//CREATE Trending
router.post('/', async (req, res) => {
  const newTrendingPost = new Trending(req.body)
  try {
    const saveTrending = await newTrendingPost.save()
    res.status(200).json(saveTrending)
  } catch (err) {
    res.status(500).json(err)
  }
})

//UPDATE Trending
router.put('/:id', async (req, res) => {
  try {
    const trending = await Trending.findById(req.params.id)
    if (trending.username === req.body.username) {
      try {
        const updatedTrending = await Trending.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
        res.status(200).json(updatedTrending)
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can update only your Trending!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//DELETE POST
router.delete('/:id', async (req, res) => {
  try {
    const trending = await Trending.findById(req.params.id)
    if (trending.username === req.body.username) {
      try {
        await trending.delete()
        res.status(200).json('Trending Post has been deleted...')
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can delete only your trending Post!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET Trending
router.get('/:id', async (req, res) => {
  try {
    const trending = await Trending.findById(req.params.id)
    res.status(200).json(trending)
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET ALL Trendings
router.get('/', async (req, res) => {
  const username = req.query.user
  const catName = req.query.cat
  try {
    let trendings
    if (username) {
      trendings = await Trending.find({ username }).sort({ _id: -1 })
    } else if (catName) {
      trendings = await Trending.find({
        categories: {
          $in: [catName],
        },
      }).sort({ _id: -1 })
    } else {
      trendings = await Trending.find().sort({ _id: -1 })
    }
    res.status(200).json(trendings)
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET All Post From All data
router.get('/blogs/:id', async (req, res) => {
  try {
    const type = req.query[0]
    let blog
    if (type === '?trending') {
      blog = await Trending.findById(req.params.id)
    }
    if (type === '?news') {
      blog = await News.findById(req.params.id)
    }
    if (type === '?blog') {
      blog = await Blog.findById(req.params.id)
    }
    if (type === '?policies') {
      blog = await Policies.findById(req.params.id)
    }

    res.status(200).json(blog)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
