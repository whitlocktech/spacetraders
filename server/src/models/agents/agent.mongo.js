const mongoose = require('mongoose')

const agentSchema = new Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    token: {
        type: String,
        trim: true,
        default: ''
    },
    ships: [{
        symbol: {
            type: String,
            trim: true,
            default: ''
        },
    }],
    credits: {
        type: Number,
        default: 0
    },
    headquarters: {
        type: String,
        trim: true,
        default: ''
    },

})

module.exports = mongoose.model('Agent', agentSchema)