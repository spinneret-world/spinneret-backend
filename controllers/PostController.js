const Post = require('../models/Post');

const PostController = {
  async list (req, res, next) {
    try {
      const posts = await Post
        .query()
        .catch(error => next(error));
      res.status(200).json({ posts: posts });
    } catch (error) {
      res.status(500).json({ error: "Error listing posts" });
    }
  },

  async get (req, res, next) {
    try {
      const post = await Post
        .query()
        .findById(req.params.id)
        .catch(error => next(error));
      res.status(200).json({ post: post});
    } catch (error) {
      res.status(500).json({ error: "Error fetching post" });
    }
  },

  async insert (req, res, next) {
    try {
      const post = await Post
        .query()
        .insert(req.body)
        .returning('*')
        .catch(error => next(error));
      res.status(200).json({ post: post });
    } catch (error) {
      res.status(500).json({ error: "Error inserting post" });
    }
  },

  async patch (req, res, next) {
    try {
      const posts = await Post
        .query()
        .patch(req.body.post)
        .findById(req.params.id)
        .catch(error => next(error));
      res.status(200).json({ posts: posts });
    } catch (error) {
      res.status(500).json({ error: "Error patching post" });
    }
  },

};

module.exports = PostController;
