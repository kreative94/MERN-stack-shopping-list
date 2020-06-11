const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: false
    },
    register_date: {
        type: Date,
        default: Date.now
    }, 
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

// module.exports = function getUserWithItems(email) {
//     return User.findOne({ email: email })
//     .populate('items').exec((err, items) => {
//         console.log('Populated User ' + items);
//     })
// }