const mongoose = require('mongoose');

const TransportSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    
    owner: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    engineType: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String || null,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Transport', TransportSchema);