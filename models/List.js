const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    title: {
            type: String,
            required: true
        },
    date: {
            type: Date,
            default: Date.now 
        },
    owner: {
            type: Schema.Types.ObjectId, 
            ref: 'user'
        }
});

module.exports = List = mongoose.model('list', ListSchema);