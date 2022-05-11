const mongoose = require("mongoose")
      Schema = mongoose.Schema

const ItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    },
})

module.exports = Iten = mongoose.model('item', ItemSchema)