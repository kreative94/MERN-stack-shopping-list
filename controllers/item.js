const Item = require('../models/item');
const List = require('../models/List');

module.exports.createNewItem = (req, res) => {
    // const foundList = 
    const newItem = new Item({
        name: req.body.name,
        date: req.body.date
    });

    newItem.save()
        .then(item => res.json(item))
        .catch(err => res.json(err));
}

module.exports.getItems = (req, res) => {
    Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
    .catch(err => res.json({ err, msg: 'No items were found'}));
}

module.exports.deleteItem = (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
}