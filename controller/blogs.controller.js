const express = require('express');
const router = express.Router();
const BlogsService = require('../services/blogs.service');

router.post('/addblog',(req, res) => {
  BlogsService.createBlogs(req.body, req.files)
  .then((response) => {
    res.status(200).send(response);
    console.log(req.body,req.files);
      })
      .catch((error) => {
          res.status(500).send({ error: 'Something went wrong. Try again later!', error });
      });
});

router.get('/', (req, res) => {
  BlogsService.getBlogs()
    .then(blogs => {
      res.status(200).send(blogs);
    })
    .catch(err => {
      console.error("Error getting blogs", err.message);
      res.status(500).send({ error: "Error getting blogs: " + err.message });
    });
});


router.get('/getblogid/:id', async (req, res) => {
  try {
      const blogId = req.params.id;
      const blog = await BlogsService.getBlogsById(blogId);
      res.status(200).json(blog);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.delete('/del', (req, res) => {
  const id = req.query.id;
  BlogsService.deleteBlogs(id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.error("Error deleting blogs", err);
      throw new Error("Error deleting blogs", err);
    })
})

router.put('/upd', (req, res) => {
  const id = req.query.id;
  const body = req.body;
  BlogsService.editBlogs(id,body,req.file)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.error("Error edit blogs", err);
      throw new Error("Error edit blogs", err);

    })
})
router.post('/like',(req, res)=>{
  const postId = req.query.postId;
  const userId = req.query.userId;

    BlogsService.likes(postId, userId)
    .then((response)=>{
      res.status(200).json(response);
    })
  .catch ((error)=>{
    console.error("Error creating likes", error);
    throw new Error("Error creating likes", error);
  })
})

router.post('/dislike',(req, res)=>{
  const postId = req.query.postId;
  const userId = req.query.userId;

    BlogsService.disLikes(postId, userId)
    .then((response)=>{
      res.status(200).json(response);
    })
  .catch ((error)=>{
    console.error("Error creating dislikes", error);
    throw new Error("Error creating dislikes", error);
  })
})

router.post('/comment',(req, res) => {
  const postId = req.query.postId;
  const userId = req.query.userId;
  const {comments} = req.body;
    BlogsService.commentBlog(postId, userId,comments)
    .then((response)=>{
      res.status(200).json(response);
    })
  .catch ((error)=>{
    console.error("Error creating dislikes", error);
    throw new Error("Error creating dislikes", error);
  })
})
module.exports = router;
