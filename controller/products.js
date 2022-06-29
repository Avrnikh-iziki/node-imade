const Product = require('../models/product')

const product = async (req, res) => {
    const { number_page } = req.params
    try {
        const allproduct = await Product.find().sort({ placed_at: -1 })
        const pages = Math.ceil(allproduct.length / 8)
        const product = allproduct.slice((number_page - 1) * 8, number_page * 8)

        res.status(200).json({ product, pages })
    } catch (err) {
        res.sendStatus(400)
    }
}
const addproduct = async (req, res) => {
    try {
        Product.create(req.body)
        return res.sendStatus(201)

    } catch (err) {
        return res.sendStatus(400)
    }
}
const editproduct = async (req, res) => {
    const { product_id } = req.params
    const product = req.body

    try {
        const update = await Product.findByIdAndUpdate(product_id, { ...product, placed_at: Date.now() })
        return res.sendStatus(201)

    } catch (err) {
        return res.sendStatus(400)
    }
}
const deleteproduct = async (req, res) => {
    const { product_id } = req.params
    try {
        const deletion = await Product.findByIdAndDelete(product_id)
        return res.sendStatus(204)

    } catch (err) {
        return res.sendStatus(400)
    }
}

module.exports = {
    product,
    addproduct,
    editproduct,
    deleteproduct
}