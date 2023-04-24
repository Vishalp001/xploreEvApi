const router = require('express').Router()
const Charging = require('../models/Charging')

//CREATE Charging Post
router.post('/', async (req, res) => {
  const newPost = new Charging(req.body)
  try {
    const savedPost = await newPost.save()
    res.status(200).json(savedPost)
  } catch (err) {
    res.status(500).json(err)
  }
})

//UPDATE Charging POST
router.put('/:id', async (req, res) => {
  try {
    const post = await Charging.findById(req.params.id)
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Charging.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
        res.status(200).json(updatedPost)
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can update only your Charging post!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//DELETE POST
router.delete('/:id', async (req, res) => {
  try {
    const post = await Charging.findById(req.params.id)
    if (post.username === req.body.username) {
      try {
        await post.delete()
        res.status(200).json('Post has been deleted...')
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can delete only your post!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET POST
// router.get('/:id', async (req, res) => {
//   try {
//     const post = await Charging.findById(req.params.id)
//     res.status(200).json(post)
//   } catch (err) {
//     res.status(500).json(err)
//   }
// })

// GET ALL POSTS
router.get('/', async (req, res) => {
  try {
    posts = await Charging.find().sort({ _id: -1 })
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get Charging Citys
router.get('/citys', async (req, res) => {
  try {
    const query = req.query[0]
    citys = await Charging.find({ state: query }, { citys: 1 })
    res.status(200).json(citys)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
