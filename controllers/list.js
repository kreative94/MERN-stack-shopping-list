const List = require('../models/List');
const User = require('../models/User');

module.exports.getLists = (req, res) => {
    List.find()
    .sort({ date: -1 })
    .populate('listItems')
    .exec()
    .then((err, lists) => {
        if(err) throw err;
        res.json(lists);
    });
    // List.find({})
    // .sort({ date: -1 })
    // .populate('listItems')
    // .exec((err, lists) => {
    //     if(err) throw err;
    //     res.json(lists);
    // });
}

module.exports.getListById = (req, res) => {
    List.findById()
    .then(lists => res.json(lists));
}

//Controller method for /routes/api/lists/:user/new
module.exports.createNewList = (req, res) => {
   
}