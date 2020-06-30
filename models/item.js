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
    user: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    listedIn: 
        {type: Schema.Types.ObjectId,
         ref: 'List'
        }
    
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;