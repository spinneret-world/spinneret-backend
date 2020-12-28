const Product = require('../models/Product');

const ProductController = {
  async list (req, res, next) {
    try {
      const products = await Product
        .query()
        .catch(error => next(error));
      res.status(200).json({ products: products });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error listing products" });
    }
  },

  async get (req, res, next) {
    try {
      const product = await Product
        .query()
        .findById(req.params.id)
        .catch(error => next(error));
      res.status(200).json({ product: product });
    } catch (error) {
      res.status(500).json({ error: "Error fetching product" });
    }
  },

  async insert (req, res, next) {
    try {
      const product = await Product
        .query()
        .insert(req.body)
        .returning('*')
        .catch(error => next(error));
      res.status(200).json({ product: product });
    } catch (error) {
      res.status(500).json({ error: "Error inserting product" });
    }
  },

  async patch (req, res, next) {
    try {
      const product = await Product
        .query()
        .patch(req.body)
        .findById(req.params.id)
        .returning('*')
        .catch(error => next(error));
      res.status(200).json({ product: product });
    } catch (error) {
      res.status(500).json({ error: "Error patching product" });
    }
  },

};

module.exports = ProductController;
