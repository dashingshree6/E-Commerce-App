const Order = require('../models/Order')
const Cart = require('../models/Cart')
const User = require('../models/User')
const config = require('config')
const stripe = require('stripe')(config.get('StripeAPIKey'))

module.exports.get_orders = async (req,res) => {
    const userId = req.params.id
    Order.find({userId}).sort({date:-1}).then(orders => res.json(orders))
}

module.exports.checkout = async (req, res) => {
    try {
        const userId = req.params.id
        const {source} = req.body
        let cart = await Cart.findOne({userId})
        let user = await User.findOne({_id:userId})
        const email = user.email

        if (cart) {
            const charge = await stripe.charges.create({
                amount: cart.bill,
                currency: 'inr',
                source: source,
                receipt_email: email
            })
            if (!charge) {
                throw error('Payment Failed')
            }
            if (charge) {
                const order = await Order.create({
                    userId,
                    items: cart.items,
                    bill: cart.bill
                })
                const data = await Cart.findByIdAndDelete({_id:cart.id})
                return res.status(201).send(order)
            }
        } else {
            return res.status(500).send('You donot hve items in cart')
        }

    } catch (error) {
        console.log(error)
        res.status(500).send('Something went wrong')
    }
}