const Order = require('../models/order')

const addorder = async (req, res) => {
    try {
        const new_order = await Order.create(req.body)
        return res.sendStatus(201)

    } catch (err) {
        return res.sendStatus(400)
    }
}
const allorders = async (req, res) => {
    try {
        const order = await Order.find({ "isTreated": false })
         return res.status(200).json({ order })
    } catch (err) {
        return res.sendStatus(400)
    }
}
const user_orders = async (req, res) => {
    const { customer_id } = req.params

    try {
        const order = await Order.find({ "customer_id": customer_id })
         return res.status(200).json({ order })
    } catch (err) {
        return res.sendStatus(400)
    }

}
const updateorder = async (req, res) => {
    const { order_id } = req.params

    try {
        const updat = await Order.findByIdAndUpdate(order_id, { "isTreated": true })
        return res.sendStatus(200)
    } catch (err) {
        return res.sendStatus(400)
    }
}

const deleteorder = async (req, res) => {
    const { order_id } = req.params
    try {
        const deletion = await Order.findByIdAndDelete(order_id)
        return res.sendStatus(204)
    } catch (err) {
        return res.sendStatus(400)
    }
}



module.exports = {
    addorder,
    allorders,
    user_orders,
    updateorder,
    deleteorder,
}

