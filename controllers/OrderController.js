const Order = require('../models/Order');
const secrets = require('../secrets.json');
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(smtpTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  auth: {
    user: secrets.gmail.username,
    pass: secrets.gmail.password
  }
}));

const OrderController = {
  async list (req, res, next) {
    try {
      const orders = await Order
        .query()
        .catch(error => next(error));
      res.status(200).json({ orders: orders });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error listing orders" });
    }
  },

  async get (req, res, next) {
    try {
      const order = await Order
        .query()
        .findById(req.params.id)
        .catch(error => next(error));
      res.status(200).json({ order: order });
    } catch (error) {
      res.status(500).json({ error: "Error fetching order" });
    }
  },

  async insert (req, res, next) {
    try {
      const order = await Order
        .query()
        .insert(req.body)
        .returning('*')
        .catch(error => next(error));

      const mailOptions = {
        from: req.body.email,
        to: secrets.gmail.to_address,
        subject: "New Order",
        text: `${req.body.name} has submitted a new order.
        
        ${req.body.order}`
      }
      transporter.sendMail(mailOptions, function(error, response){
        if(error) {
          console.log(error);
          res.status(500).json({ error: "Error inserting order" });
        } else {
          res.status(200).json({ order: order });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error inserting order" });
    }
  },

  async patch (req, res, next) {
    try {
      const order = await Order
        .query()
        .patch(req.body)
        .findById(req.params.id)
        .returning('*')
        .catch(error => next(error));
      res.status(200).json({ order: order });
    } catch (error) {
      res.status(500).json({ error: "Error patching order" });
    }
  },

};

module.exports = OrderController;
