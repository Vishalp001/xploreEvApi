const router = require('express').Router()
const Blog = require('../models/Blog')

//CREATE Blog
router.post('/', async (req, res) => {
  const newBlog = new Blog(req.body)
  try {
    const savedBlog = await newBlog.save()
    res.status(200).json(savedBlog)
  } catch (err) {
    res.status(500).json(err)
  }
})

//UPDATE Blog
router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (blog.username === req.body.username) {
      try {
        const updateBlog = await Blog.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
        res.status(200).json(updateBlog)
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can update only your Blog!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//DELETE POST
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (blog.username === req.body.username) {
      try {
        await blog.delete()
        res.status(200).json('Blog has been deleted...')
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('You can delete only your Blog!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET POST
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    res.status(200).json(blog)
  } catch (err) {
    res.status(500).json(err)
  }
})

//GET ALL POSTS
router.get('/', async (req, res) => {
  const username = req.query.user
  const catName = req.query.cat
  try {
    let blogs
    if (username) {
      blogs = await Blog.find({ username })
    } else if (catName) {
      blogs = await Blog.find({
        categories: {
          $in: [catName],
        },
      })
    } else {
      blogs = await Blog.find().sort({ _id: -1 })
    }
    res.status(200).json(blogs)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
