const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
         type: String,
         required: true
        },
    date: {
        type: Date,
         default: Date.now
        },
    completed : {
        type: Boolean,
         default: false
        },
    owner : {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    listedIn: {
        type: Schema.Types.ObjectId,
        ref: 'List',
        required: true
    }
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;